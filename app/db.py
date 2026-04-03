import sqlite3

# SQLite connection 
conn = sqlite3.connect("expenses.db", check_same_thread=False)

def run_query(query):
    # safety check
    forbidden = ["drop", "delete", "update", "insert"]
    if any(word in query.lower() for word in forbidden):
        raise Exception("Unsafe query")
    
    return conn.execute(query).fetchall()