from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField,IntegerField
from wtforms.validators import Length, DataRequired

class TagForm(FlaskForm):
    postId = IntegerField('postId', validators=[DataRequired()])
    tagId = IntegerField('tagId', validators=[DataRequired()])
    description = StringField('description', validators=[Length(max=50),DataRequired()])
