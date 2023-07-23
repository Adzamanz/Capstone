from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, DataRequired

class PostTagForm(FlaskForm):
    postId = IntegerField('postId', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    description = StringField('description', validators=[Length(max=50),DataRequired()])
