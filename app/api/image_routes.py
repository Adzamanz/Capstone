from flask import Blueprint, jsonify, request, Response, flash
from flask_login import login_required, current_user
from app.models import Image, db
from app.forms import ImageForm
# from file_handler import *
import uuid
import boto3

import os
AWS_ACCESS_KEY=os.environ.get('ACCESS_KEY')
AWS_SECRET_KEY=os.environ.get('SECRET_ACCESS_KEY')
S3_BUCKET_NAME=os.environ.get('BUCKET_NAME')
AWS_REGION=os.environ.get('AWS_REGION')

s3 = boto3.client('s3',
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_REGION
    )


def upload_file_to_s3(file, provided_file_name):
    s3.upload_fileobj(file, S3_BUCKET_NAME, provided_file_name)

image_routes = Blueprint('images', __name__)


@image_routes.route('/')
def images():
    images = Image.query.all()

    return jsonify([image.to_dict() for image in images])

@image_routes.route('/<int:id>')
@login_required
def image(id):
    image = Image.query.get(id)
    return image.to_dict()

@image_routes.route('/img/<int:id>')
def img(id):
    image = Image.query.get(id)
    ret = image.img()
    return Response(ret)

@image_routes.route('/current')
@login_required
def user_images():
    user_id = current_user.id
    images = Image.query.filter(Image.userId == user_id).all()
    return jsonify([image.to_dict() for image in images])


@image_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    if not image:
        return jsonify(error = 'Image not found'), 404
    db.session.delete(image)
    db.session.commit()

    return jsonify(message = 'Image Deleted Successfully')

@image_routes.route('/new', methods=['POST'])
@login_required
def add_image():
    form = ImageForm()
    user_id = current_user.id

    if 'image' not in request.files:
        flash('No file uploaded', 'danger')

    print(request.files)
    file_to_upload = request.files['image']

    if file_to_upload.filename == '':
        flash('No file uploaded', 'danger')
    new_image = Image(
        name=form.name.data,
        postId=form.postId.data,
        userId=user_id,
    )

    upload_file_to_s3(file_to_upload, f"{user_id}@{new_image.name}" )
    data = {
        "name": f"{user_id}@{new_image.name}",
        "image": form.image.data
    }
    
    db.session.add(new_image)
    db.session.commit()
    return jsonify(new_image.to_dict())
