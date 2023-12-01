from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_posts():
    announcement = Post(
        feedId=2,userId=1, type='none', title="Out of hot sauce",
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
    general1 = Post(feedId=1, userId=1, type="none", title="Lost and Found",
                     body="""This week we have found a jacket, watch, and one pair of house key. if you are missing any of these items, please, inquire with the synnagogue president or associated members. or treply to this post. """,
                     reply=True,
                )
    general2 = Post(feedId=1, userId=1, type="donate", title="Raising funds for new chairs",
                     body="""Our chairs have experienced some wear and tear. As such, we are seeking to raise funds to purchase some new ones. Please, contribute if you can.""",
                     reply=True,
                )
    general3 = Post(feedId=1, userId=1, type="none", title="Lost and Found",
                     body="""The jacket from two weeks ago is still in the Lost and Found. its is brown and very cozy... if anyone knows who's missing this jacket, please let us know.""",
                     reply=True,
                )
    # shiur = Post(
    #     feedId=1, userId=1, title="Weekly Shiurim",
    #     body="""
    #         Daily

    #             The Sol Teichman Z"L Daf Yomi Shiur With Rabbi Yitzchak Etshalom 

    #         Shiur meets at YICC (including Shabbat) immediately after the early Minyan.

    #         Also via Zoom: Meeting ID: 284 825 0055 Password:258526

    #         www.dafyomiyicc.org

    #             Kollel Boker- in conjunction with the Jack & Gitta Nagel YU Community Kollell

    #         Monday-Thursday: 6.15-7.00 am

    #         For more information contact Rabbi Pere: ypere@yukollelLA.com
            
    #         Mondays

    #             The Daf Goes Deep - With Rabbi Yitzchak Etshalom

    #         5:45pm via Zoom

    #         https://us06web.zoom.us/j/2098638940

    #             Semichat Chaver Program with R' Seth Berkowitz

    #         8.30pm - in person only
            
    #         Tuesdays

    #         Rabbi Muskin's Talmud Shiur

    #         8.30pm- Via Zoom

    #         https://us02web.zoom.us/j/85470825135
            
    #         Wednesdays

    #             Parasha Shiur for Women with Rabbi Muskin

    #         9.30am-  in person & via Zoom

    #         https://us02web.zoom.us/j/83982615436

    #         BELOW FOR THE SHIUR VIDEOS:

    #         https://www.yicc.org/rabbi-muskins-womens-shiur.html

            

    #             Exploring Lesser-Known Halakhot & Minhagim with Rabbi Mahler

    #         8.15pm- in person
    #         """,
    #     reply=False,
    # )
    # general4 = Post(feedId=2, userId=1, type="none", title="filler",
    #                  body="""filler""",
    #                  reply=True,
    #             )
    db.session.add(announcement)
    db.session.add(class1)
    db.session.add(general3)
    db.session.add(general2)
    db.session.add(general1)
    # db.session.add(shiur)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
