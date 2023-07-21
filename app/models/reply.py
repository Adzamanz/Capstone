from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from datetime import datetime

class Reply(db.Model):
    __tablename__ = "replies"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    postId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    body = db.Column(db.String(500), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now().date())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now().date())

    post = relationship("Post", back_populates="replies")
    user = relationship("User", back_populates="replies")
