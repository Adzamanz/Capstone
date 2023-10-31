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
    general1 = Post(feedId=2, userId=1, type="none", title="Lost and Found",
                     body="""This week we have found a jacket, watch, and one pair of house key. if you are missing any of these items, please, inquire with the synnagogue president or associated members. or treply to this post. """,
                     reply=True,
                )
    general2 = Post(feedId=2, userId=1, type="donate", title="Raising funds for new chairs",
                     body="""Our chairs have experienced some wear and tear. As such we are seeking to raise funds to purchase some new ones. Please, contribute if you can.""",
                     reply=True,
                )
    general3 = Post(feedId=2, userId=1, type="none", title="Lost and Found",
                     body="""The jacket from two weeks ago is still in the Lost and FOund. its is brown and very cozy... if anyone knows who's missing this jacket, please let us know.""",
                     reply=True,
                )
    # general4 = Post(feedId=2, userId=1, type="none", title="filler",
    #                  body="""filler""",
    #                  reply=True,
    #             )
    db.session.add(announcement)
    db.session.add(class1)
    db.session.add(general1)
    db.session.add(general2)
    db.session.add(general3)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
