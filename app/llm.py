def generate_sql(question, schema):
    #TODO - write actual LLM call to generate db query
    return "SELECT category, SUM(amount) as total FROM transactions GROUP BY category"

def generate_summary(data):
    total = sum(row[1] for row in data)
    return f"Total amount across categories: ${total:.2f}"