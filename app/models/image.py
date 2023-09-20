from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    postId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    post = relationship("Post", back_populates="images")
    user = relationship("User", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'name': self.name,
        }
