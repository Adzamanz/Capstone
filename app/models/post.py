from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from datetime import datetime

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    feedId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("feeds.id")), nullable=False)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    date = db.Column(db.DateTime)
    type = db.Column(db.String(15), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(3000), nullable=False)
    reply = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now().date())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now().date())


    user = relationship("User", back_populates="posts")
    feed = relationship("Feed", back_populates="posts")
    transactions = relationship("Transaction", back_populates="post")
    replies = relationship("Reply", back_populates="post", cascade="all, delete-orphan")
    posttags = relationship("PostTag", back_populates="post", cascade="all, delete-orphan")
    tags = relationship("Tag", back_populates="post", cascade="all, delete-orphan")
    images = relationship("Image", back_populates="post", cascade="all, delete-orphan")

    def to_dict(self):
        replies1 = [
            {
                'id': reply.id,
                'userId': reply.userId,
                'postId': reply.postId,
                'body': reply.body,
                'createdAt': reply.createdAt,
                'updatedAt': reply.updatedAt
            }
            for reply in self.replies
        ]
        return {
            'id': self.id,
            'feedId': self.feedId,
            'userId': self.userId,
            'date': self.date,
            'type': self.type,
            'title': self.title,
            'body': self.body,
            'reply': self.reply,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'replies': replies1,
            'images': self.images
        }
