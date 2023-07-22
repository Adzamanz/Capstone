from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import Length, DataRequired

class TransactionForm(FlaskForm):
    postId = IntegerField('postId')
    value = FloatField('value', validators=[DataRequired(),min(0)])
    fee = FloatField('fee')
    description = StringField('description', validators=[DataRequired()])
    # type = StringField('type', valdiators=[DataRequired()])
