from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import Length, DataRequired

class FeedForm(FlaskForm):
    description = StringField('description', validators=[Length(max=300),DataRequired()])
    public = BooleanField('type', validators=[DataRequired()])
