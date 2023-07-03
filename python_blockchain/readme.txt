# Install python on pc
    3.10 or above
    
Libraries Download:
    pip install PyJWT
    pip install Flask
    pip install Flask-Cors
    pip install Flask-Security
    pip install psycopg2
    pip install gevent
Project run :
    python run.py
Database use in this project is Postgresql : psycopg2 
    Database name : blockchain
        Contain Two tables
            User : name , email , password
            blockchain :id , number , hash, previous , data , nonce 



port:
    http://localhost:8089

    API:
        http://localhost:8089/api/register              (User register in Blockchain with name , email and password)
        http://localhost:8089/api/login                 (User login in with jwt authentication)
        http://localhost:8089/api/current_user/<email>  (Get current Users details)
        http://localhost:8089/api/buy_money/<name>      (Tempoary buy money from bank  )
        http://localhost:8089/api/blockchain/<name>     (current user perform transaction and make a block of blockchain )
        http://localhost:8089/api/blockchain_data       (Get Complete blockchain data)
        http://localhost:8089/api/getBalance/<name>     (Check balance in the account)
        http://localhost:8089/api/chain_valid           (Check Blockchain is chain is valid)





    

