from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    home = User(
        username='Official', email='home@aa.io', password='password')
    demo1 = User(
        username='demo1', email='demo1@aa.io', password='password')
    demo2 = User(
        username='demo2', email='demo2@aa.io', password='password')
    isaac = User(
        username='isaac', email='isaac@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    mathew = User(
        username='mathew', email='mathew@aa.io', password="password")

    db.session.add(home)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(isaac)
    db.session.add(bobbie)
    db.session.add(mathew)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
