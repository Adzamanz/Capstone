from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class PostTag(db.Model):
    __tablename__ = "posttags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    type = db.Column(db.String, nullable=False)
    description = db.Column(db.String(50), nullable=False)

    tags = relationship("Tag", back_populates="postTag", cascade="all, delete-orphan")
    post = relationship("Post", back_populates="post")
