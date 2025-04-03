import mysql.connector
from mysql.connector import Error


DB = "Bob_Ross_TV"

def create_connection(host_name, user_name, user_password, db_name=None):  # db_name is optional
    connection = None
    try:
        if db_name:
            connection = mysql.connector.connect(
                host=host_name,
                user=user_name,
                passwd=user_password,
                database=db_name,
            )
        else:
            connection = mysql.connector.connect(
                host=host_name,
                user=user_name,
                passwd=user_password,
            )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' has occurred")

    return connection

def create_database(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

connection = create_connection("localhost", "root", "root")

if connection:
    query = "CREATE DATABASE IF NOT EXISTS Bob_Ross_TV"
    create_database(connection, query)

    new_connection = create_connection("localhost", "root", "root", DB)

    if new_connection:
        print(f"Connected to the {DB} database.")
        new_connection.close()

    connection.close()
