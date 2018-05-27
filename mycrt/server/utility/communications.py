import boto3
import pymysql as sql
import sqlite3 as util_sql
import os

# One instance of a ComManager object will be used per process
class ComManager:

    # Class level values
    # Will be set in the main mycrt.py upon runtime
    S3name = None
    credentials = None 

    def __init__(self):
        self.boto_conns = {}
        self.sql_conns = {}

    def get_boto(self, service):
        if service not in self.boto_conns:
            self.boto_conns[service] = boto3.client(service, **(ComManager.credentials))
        return self.boto_conns[service]

    def _test_sql_connection(self, db_info):
        try:
            connection = sql.connect(host = db_info["hostname"], 
                         user = db_info["username"], 
                         passwd = db_info["password"], 
                         db = db_info["database"])
            connection.close()
            return True
        except:
            return False

    def get_sql(self, db_info = None):
        '''
        db_info : {
            hostname = String, 
            username = String, 
            password = String, 
            database = String
        }
        '''
  
        if db_info is None:
            connection = util_sql.connect('util.db', isolation_level = None) # autocommit on by default
            cursor = connection.cursor()
            return {"conn" : connection, "cur" : cursor}
        else:
            connection = sql.connect(host = db_info["hostname"], 
                                     user = db_info["username"], 
                                     passwd = db_info["password"], 
                                     db = db_info["database"], 
                                     autocommit = True)
            cursor = connection.cursor()
            return {"conn" : connection, "cur" : cursor}

    def close_sql(self, db_info = None):
        if db_info is None:
            db_info = 'util.db'
        if isinstance(db_info, dict):
            db_name = db_info["database"]
        else:
            db_name = db_info
        obj = self.sql_conns[db_name]
        cursor = obj['cur']
        connection = obj['conn']
        cursor.close()
        connection.close()
        del self.sql_conns[db_name]

    def execute_query(self, query, **kwargs):
        """Executes a query on a cursor.

        Args:
            query: A SQL query to commit
            cursor: The cursor pointing to a database to execute on

        Returns:
            A list of tuples containing the results of the query. Each element
            in the list is a tuple representing one row and each element of the
            tuple is a value for one column. 
        """
        if (kwargs == {}) or ("hostname" not in kwargs) or ("username" not in kwargs) or ("password" not in kwargs) or ("database" not in kwargs):
            db_info = None
        else:
            db_info = kwargs

        con_obj = self.get_sql(db_info)
        connection, cursor = con_obj["conn"], con_obj["cur"]
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        connection.close()
        return results

    def setup_utility_database(self):
        if not os.path.exists("util.db"):
            capture_command = '''
                CREATE TABLE Captures (
                db text DEFAULT NULL,
                name text NOT NULL DEFAULT '',
                start_time text DEFAULT NULL,
                end_time text DEFAULT NULL,
                status text DEFAULT NULL,
                endpoint text DEFAULT NULL,
                username text DEFAULT NULL,
                password text DEFAULT NULL,
                rds text DEFAULT NULL,
                filters text DEFAULT NULL,
                PRIMARY KEY (name))
            '''
            replays_command = '''
                CREATE TABLE Replays (
                replay text NOT NULL DEFAULT '',
                capture text NOT NULL DEFAULT '',
                db text DEFAULT NULL,
                start_time text DEFAULT '',
                mode text DEFAULT NULL,
                rds text DEFAULT NULL,
                PRIMARY KEY (replay,capture))
            '''

            conn_dict = self.get_sql()
            connection, cursor = conn_dict["conn"], conn_dict["cur"]
            cursor.execute(capture_command)
            cursor.execute(replays_command)
            cursor.close()
            connection.close()

    def list_databases(self):
      """Find all databases and create a mapping between the id and endpoints

      Args:
        cm: A ComManager object to handle connections

      Returns:
        A dictionary where the keys are the database instance ids available to the user 
        and the values are the associated endpoints.
      """

      rds_client = self.get_boto('rds')
      instances = rds_client.describe_db_instances()
      
      return {item['DBInstanceIdentifier'] : item['Endpoint']['Address'] for item in instances['DBInstances']}
  

    def valid_database_credentials(self, db_name, endpoint, username, password):
        db_info = {
            "hostname" : endpoint, 
            "username" : username, 
            "password" : password, 
            "database" : db_name
        }

        return self._test_sql_connection(db_info)

    def process_endpoint(self, rds_name, endpoint):
        if endpoint != "":
            return endpoint
        else:
            return self.list_databases()[rds_name]
