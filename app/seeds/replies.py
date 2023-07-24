from app.models import db, Reply, environment, SCHEMA
from sqlalchemy.sql import text
def seed_replies():
    hotsaucereply = Reply(
        userId=3,postId=1,body="""i'll bring some thursday"""
    )
    classreply = Reply(
        userId=3, postId=2, body="""do we have enough chairs?"""
    )
    db.session.add(hotsaucereply)
    db.session.add(classreply)
    db.session.commit()
    
def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM replies"))

    db.session.commit()
