from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, DateField
from wtforms.validators import Length, DataRequired

class PostForm(FlaskForm):
    feedId = IntegerField('feedId', validators=[DataRequired()])
    date = DateField('date')
    type = StringField('type', validators=[Length(max=10),DataRequired()])
    title = StringField('title', validators=[Length(max=50),DataRequired()])
    body = StringField('body', validators=[Length(max=3000),DataRequired()])
    reply = BooleanField('reply', validators=[DataRequired()])
