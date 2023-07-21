from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import Length, DataRequired

class FeedForm(FlaskForm):
    description = StringField('description', validators=[Length(max=300),DataRequired()])
    type = BooleanField('type', validators=[DataRequired()])
