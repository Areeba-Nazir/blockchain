from __future__ import absolute_import
import flask_app.server as ser


if __name__ == '__main__':
    ser.debug = False
    ser.threaded=True 
    ser.main()