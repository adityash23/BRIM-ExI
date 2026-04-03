from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

from app.db import conn
from app.llm import generate_sql, generate_summary

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Request model
class QueryRequest(BaseModel):
    question: str

@app.post("/query")
def query_data(req: QueryRequest):
    question = req.question

    # schema for LLM 
    schema = {
    "table": "transactions",
    "columns": [
        {"name": "date", "type": "datetime", "description": "Date of transaction"},
        {"name": "amount", "type": "float", "description": "Amount spent in USD"},
        {"name": "department", "type": "text", "description": "Department that made the expense"},
        {"name": "category", "type": "text", "description": "Category of the expense (e.g., Software, Travel)"},
        {"name": "merchant", "type": "text", "description": "Vendor or merchant name"}
        ]
    }

    sql = generate_sql(question, schema)

    df = pd.read_sql(sql, conn)


    summary = generate_summary(df.values)

    # return json to frontend
    return {
        "sql": sql,
        "data": df.to_dict(orient="records"),
        "chart-columns": list(df.columns),
        "summary": summary
    }