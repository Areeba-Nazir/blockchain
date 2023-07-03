
import jwt
import json
import time
import logging
import traceback
import psycopg2
import operator
import requests
from flask_cors import CORS
from flask import Response, request
from .factory import create_app
from .blocck import *
from gevent.pywsgi import WSGIServer
from gevent import monkey
monkey.patch_all()
psycopg2.extensions.register_type(psycopg2.extensions.UNICODE)
logger = logging.getLogger(__name__)
app = create_app()
cors = CORS(app, resources={r'/*': {"origins": '*'}})

#---#-------------------------------------------------------------------------------------------------------------------------------------#
###############################################################################################################################################

###############Connection FLask with poastgresql######################3
    # Connect to an existing database
connection = psycopg2.connect(user="postgres",
                                  password="123456",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="blockchain")
    # Create a cursorsor to perform database operations
cursor = connection.cursor()



@app.route('/')
def index():
    print("app run well")
    return "Hello postgresql connection app"


#########################################################################################################################
####################################### register user        ############################################################
#########################################################################################################################

@app.route('/api/register', methods=['GET', 'POST'])
def user_register():
    if 'name' in request.form and 'email' in request.form and 'password' in request.form :
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
    else:
        content = request.get_json(silent=True)
        name = content['name']
        email = content['email']
        password = content['password']
    check_query= "SELECT email FROM users where email='" + email + "'"
    cursor.execute(check_query)
    if len(cursor.fetchall())== 0:
        try:
            cursor.execute("INSERT INTO users(name, email, password) VALUES(%s, %s, %s) RETURNING id;",
                        (name, email, password))
            user_id = cursor.fetchone()[0]
            connection.commit()
            json_response = json.dumps("Account Created", indent=4, sort_keys=True, default=str)
            return Response(json_response, status=200, mimetype='application/json')
        except Exception:
            loglogger.error("Error Happend in execution.", exc_info=1)
            return Response("Error Happend in execution.", status=400, mimetype='application/json')
    else:
        json_response = json.dumps(email +" Your Account is already created", indent=4, sort_keys=True, default=str)
        return Response(json_response, status = 201, mimetype='application/json')

#########################################################################################################################
####################################### Login user and generate jwt token       #########################################
#########################################################################################################################
def user(email):
    cursor.execute("SELECT name , email ,password  from users where email= '" + email + "'" )
    data = cursor.fetchall() 
    userdata=data
    payload = {
        'payload':userdata
    } 
    authization=str(jwt.encode(payload ,"secret", algorithm="HS256"))
    token = authization.split("b'")
    json_response = json.dumps({"token": str(token[0])})
    return Response(json_response, status=200, mimetype='application/json')

@app.route("/api/login" ,methods = ['GET','POST'] )
def sign_in():
    if   'email' in request.form and 'password' in request.form:
        email = request.form['email']
    else:
        content = request.get_json(silent=True)
        email = content['email']
    return user(email)

#token authentication  
def token_auth(endpoint):
    def inner1(func):
        def inner2(*args, **kwargs):
            authization=request.headers.get('authorization')
            # print(authization)
            return func(*args,**kwargs)
        return inner2
    return inner1   

#########################################################################################################################
####################################### Fetch current user details              #########################################
#########################################################################################################################
@app.route("/api/current_user/<email>" ,methods = ['GET','POST'] )
@token_auth("/api/current_user/<email>" )
def get_data(email):#get user data
    cursor.execute("SELECT * from users where email = '" + email + "'")
    data = cursor.fetchall() 
    json_response = json.dumps({ "id" : str(data[0][0]), "username" : str(data[0][1]) , "email" : str(data[0][2]) , "password" : str(data[0][3]) })
    return Response(json_response, status=200, mimetype='application/json')
  
#########################################################################################################################
####################################### Perform Transaction and add blockchains  #######################################
########################################################################################################################
@app.route('/api/blockchain/<name>', methods=['GET', 'POST'])
def transaction_block(name):
    if  'recipient' in request.form and 'amount' in request.form :
        recipient = request.form['recipient']
        amount = request.form['amount']
    else:
        content = request.get_json(silent=True)
        recipient = content['recipient']
        amount = content['amount']
    result = send_money( name , recipient , amount)
    json_response = json.dumps(result)
    return Response(json_response, status=200, mimetype='application/json')
#########################################################################################################################
####################################### Buy Money from bank  #######################################
########################################################################################################################
@app.route('/api/buy_money/<name>', methods=['GET', 'POST'])        
def buy(name):
   
    if 'amount' in request.form :
        amount = request.form['amount']
    else:
        content = request.get_json(silent=True)
        amount = content['amount']
    send_money("BANK" , name , amount)
    json_response = json.dumps("Are you sure to buy money from bank")
    return Response(json_response, status=200, mimetype='application/json')
#########################################################################################################################
####################################### Get BlockChain all data   #######################################
########################################################################################################################
@app.route('/api/blockchain_data', methods=['GET', 'POST'])        
def get_chains_data():
    blockchain = Blockchain()
    cursor.execute("""SELECT * FROM blockchains """)
    result = cursor.fetchall()
    json_response = json.dumps(result)
    return Response(json_response, status=200, mimetype='application/json')
#########################################################################################################################
####################################### Get remaining balance of current user    #######################################
########################################################################################################################
@app.route('/api/getBalance/<name>', methods=['GET', 'POST'])        
def getbalance(name):

    balance = get_balance(name)
    json_response = json.dumps(balance)
    return Response(json_response, status=200, mimetype='application/json')
#########################################################################################################################
####################################### Check chain is valid or not     #######################################
########################################################################################################################
@app.route('/api/chain_valid', methods=['GET', 'POST'])        
def validity():
    valid = chain_valid()

    if valid == True:

        json_response = json.dumps("Block chain is valid")
        return Response(json_response, status=200, mimetype='application/json')
    else:
        json_response = json.dumps("Sorry Some error occur in Blockchain")
        return Response(json_response, status=200, mimetype='application/json')
#########################################################################################################################
####################################### fetch recent activity perform   #######################################
########################################################################################################################        
@app.route('/api/recent_activity', methods=['GET', 'POST'])        
def recent_activity():
    cursor.execute("""SELECT * FROM blockchains ORDER BY id DESC LIMIT 1 """)
    result = cursor.fetchall()
    json_response = json.dumps(result)
    return Response(json_response, status=200, mimetype='application/json')



def isnewuser (name): # check user exit in the chain project 
    cursor.execute("""SELECT name FROM users """)
    result = cursor.fetchall()
    names = []
    for i in result:
        names.append(i[0])
    return False if name in names else True
def send_money(sender , recipient , amount) : # transaction perform 
    try: 
        amount = float(amount)
    except ValueError:
        return "Invalid transaction"
    if amount > get_balance(sender) and sender != "BANK" :
        return "Insufficient funds"
    elif sender == recipient or amount <= 0.00:
        return "Invalid transaction"
    elif isnewuser (recipient):
        return "User Does not exist"
    number = 1
    blockchain = get_chains()
    for blocks in blockchain.chain:
        
        number = int(blocks.number)+ 1
    data = "%s-->%s-->%s" %(sender , recipient , amount)
    blockchain.mine(Block(number , data = data))
    cursor.execute('DELETE FROM blockchains')
    connection.commit()
    blocks = blockchain.chain
    for block in blocks:
        try:
            cursor.execute("INSERT INTO blockchains(number, hash, previous , data , nonce ) VALUES(%s , %s , %s , %s , %s)",
                        (block.number, block.hash(), block.previous_hash,block.data,block.nonce))
            connection.commit()
        except Exception:
            json_response = json.dumps('Error Happend in execution')
            return Response(json_response, status=500, mimetype='application/json')
    res = "Transaction successfully done"
    return res
def get_balance(name): # Get balance of current user
    balance = 0.00
    cursor.execute("""SELECT data FROM blockchains """)
    result = cursor.fetchall()
    for i in result:
        data = i[0].split("-->")
        if name == data[0]:
            balance -= float(data[2])
        elif name == data[1]:
            balance += float(data[2])
    return balance            
def get_chains (): # Get data of chain
    blockchain = Blockchain()
    cursor.execute("""SELECT * FROM blockchains """)
    result = cursor.fetchall()
    for i in result:
        # print(i)
        blockchain.add(Block(i[1],i[3],i[4],i[5]))
    return blockchain
def chain_valid(): # check chain is valid or not
    blockchain = Blockchain()
    cursor.execute("""SELECT * FROM blockchains """)
    result = cursor.fetchall()
    for i in result:
        blockchain.add(Block(i[1],i[3],i[4],i[5]))
    return blockchain.isValid()



###############################################################################################################################################
###############################################################################################################################################
def main():
    """Main entry point of the app."""
    try:        
        http_server = WSGIServer(('::', 8089), app.wsgi_app, log=logging, error_log=logging)
        http_server.serve_forever()
    except Exception as exc:
        logger.error(exc.message)
        logger.exception(traceback.format_exc())
    finally:
        # Do something here
        pass
###############################################################################################################################################