from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateTimeField
from wtforms.validators import Length, DataRequired

class PostForm(FlaskForm):
    feedId = IntegerField('feedId', validators=[DataRequired()])
    date = DateTimeField('date')
    type = StringField('type', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])
    replies = BooleanField('replies', validators=[DataRequired()])
