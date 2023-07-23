from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from datetime import datetime

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    postId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    tagId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("posttags.id")), nullable=False)
    description = db.Column(db.String(50), nullable=False)

    post = relationship("Post", back_populates="tags")
    user = relationship("User", back_populates="tags")
    postTag = relationship("PostTag", back_populates="tags")
