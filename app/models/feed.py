from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Feed(db.Model):
    __tablename__ = "feeds"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    public = db.Column(db.Boolean, nullable=False)

    user = relationship("User", back_populates="feeds")
    posts = relationship("Post", back_populates="feed",cascade="all, delete-orphan")

    def to_dict(self):
        posts1 = [
            {
                'id': post.id,
                'feedId': post.feedId,
                'userId': post.userId,
                'date': post.date,
                'title': post.title,
                'body': post.body,
                'reply': post.reply,
                'createdAt': post.createdAt,
                'updatedAt': post.updatedAt,
            }
            for post in self.posts
        ]

        return {
            'id': self.id,
            'userId': self.userId,
            'description': self.description,
            'posts': posts1,
        }
