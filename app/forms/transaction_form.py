from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import Length, DataRequired, NumberRange

class TransactionForm(FlaskForm):
    postId = IntegerField('postId')
    value = FloatField('value', validators=[DataRequired(),NumberRange(min=0)])
    fee = FloatField('fee')
    description = StringField('description', validators=[Length(max=100),DataRequired()])
    type = StringField('type', valdiators=[Length(max=10),DataRequired()])
