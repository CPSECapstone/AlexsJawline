#from server import mycrt
import pytest
import unittest
import requests
import json
#from mycrt import application
from .context import *


"""
if __name__ == '__main__':

    if __package__ is None:
        import sys
        from os import path
        sys.path.append( path.dirname( path.dirname( path.abspath(__file__) ) ) )
        from server.mycrt import *
    else:
        from ..server.mycrt import *
"""


class TestFlaskApi(unittest.TestCase):
    def setUp(self):
        self.app = server.mycrt.application.test_client()

    def test_rest_endpoint(self):
        response = self.app.get('/test')
        responseData = response.data.decode('UTF-8')
        self.assertEqual(responseData, "Test REST endpoint.")

    
