from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, DataRequired

class ReplyForm(FlaskForm):
    postId = IntegerField('postId', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])
    