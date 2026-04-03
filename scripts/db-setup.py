import pandas as pd
import sqlite3

df = pd.read_csv("data/transactions.csv")
conn = sqlite3.connect("expenses.db")

df.to_sql("transactions", conn, if_exists="replace", index=False)

print("Database created!")