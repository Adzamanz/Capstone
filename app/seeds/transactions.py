from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transactions():
    a = Transaction(
        userId=3,value=100.00, fee=2.50,description="i'd like to open prayers", type="pledge"
    )
    db.session.add(a)
    db.session.commit()
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
