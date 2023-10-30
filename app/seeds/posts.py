from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_posts():
    announcement = Post(
        feedId=1,userId=1, type='none', title="Out of hot sauce",
        body="""We have run out of Sriracha, so this weeks cholent will be less spicy than ususal.
        If someone could donate a bottle or two, that'd be great. Otherwise we should have more in a week""",
        reply=True
    )
    class1 = Post(
        feedId=3, userId=4, date=date(2023,12,25), type='event', title="class this week",
        body=""" Class this week will be taught by Rabbi Rav.
        Food for this week is sushi, start time, as usual, is 7pm.""",
        reply=True,
    )
    db.session.add(announcement)
    db.session.add(class1)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
