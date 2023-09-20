from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import Length, DataRequired

class ImageForm(FlaskForm):
    name = StringField('name', validators=[Length(max=100),DataRequired()])
    postId = IntegerField('feedId', validators=[DataRequired()])
    file = FileField("file",validators=[DataRequired()])
