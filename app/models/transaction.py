from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    postId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("posts.id")))
    value = db.Column(db.Float, nullable=False)
    fee = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(100), nullable=False)
    entry_date = db.Column(db.DateTime, nullable=False, default=datetime.now().date())
    transaction_date = db.Column(db.DateTime,)
    type = db.Column(db.String(10), nullable=False)


    user = relationship("User", back_populates="transactions")
    post = relationship("Post", back_populates="transactions")
