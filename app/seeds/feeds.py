from app.models import db, Feed, environment, SCHEMA
from sqlalchemy.sql import text

def seed_feeds():
    announcements = Feed(userId=1, description="Official announcements feed",public=False)
    general = Feed(userId=1, description="General Feed", public=True)
    study = Feed(userId=4,description="Isaac's Torah class Feed", public=False)
    db.session.add(announcements)
    db.session.add(general)
    db.session.add(study)
    db.session.commit()

def undo_feeds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.feeds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM feeds"))

    db.session.commit()
