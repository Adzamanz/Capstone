from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Image, db
from app.forms import ImageForm

import boto3, botocore

app.config['S3_BUCKET'] = "S3_BUCKET_NAME"
app.config['S3_KEY'] = "AWS_ACCESS_KEY"
app.config['S3_SECRET'] = "AWS_ACCESS_SECRET"
app.config['S3_LOCATION'] = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

s3 = boto3.client(
   "s3",
   aws_access_key_id=app.config['S3_KEY'],
   aws_secret_access_key=app.config['S3_SECRET']
)



upload_routes = Blueprint('upload', __name__)


@upload_routes.route('/upload')
@login_required
def upload(data):

@app.route("/", methods=["POST"])
def upload_file():
    if "user_file" not in request.files:
        return "No user_file key in request.files"

    file = request.files["user_file"]

    if file.filename == "":
        return "Please select a file"

    if file:
        file.filename = secure_filename(file.filename)
        output = send_to_s3(file, app.config["S3_BUCKET"])
        return str(output)

    else:
        return redirect("/")


def upload_file_to_s3(file, bucket_name, acl="public-read"):
    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type    #Set appropriate content type as per the file
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e
    return "{}{}".format(app.config["S3_LOCATION"], file.filename)
