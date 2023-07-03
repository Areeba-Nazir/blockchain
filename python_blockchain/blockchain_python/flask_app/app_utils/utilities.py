from __future__ import absolute_import
import logging
import os
from logging import handlers
from . import html_codes
class InvalidAPIUsage(Exception):
    status_code = html_codes.HTTP_BAD_REQUEST
    def __init__(self, message, status_code=None, payload=None):        
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload
    def to_dict(self):        
        ret_val = dict(self.payload or ())
        ret_val['message'] = self.message
        return ret_val