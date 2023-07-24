from app.models import db, PostTag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_tags():
    like = PostTag(
        postId=1, type="like", description="Like button"
    )
def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posttags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posttags"))

    db.session.commit()
