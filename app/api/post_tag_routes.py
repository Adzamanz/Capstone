from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import PostTag, db
from app.forms import PostTagForm


post_tag_routes = Blueprint('post_tags', __name__)


@post_tag_routes.route('/')
@login_required
def post_tags():
    post_tags = PostTag.query.all()
    return jsonify([post_tag.to_dict() for post_tag in post_tags])

@post_tag_routes.route('/<int:id>')
@login_required
def post_tag(id):
    post_tag = PostTag.query.get(id)
    return post_tag.to_dict()

@post_tag_routes.route('/current')
@login_required
def user_post_tags():
    user_id = current_user.id
    post_tags = PostTag.query.filter(PostTag.userId == user_id).all()
    return jsonify([post_tag.to_dict() for post_tag in post_tags])

@post_tag_routes.route('/new', methods=['POST'])
@login_required
def add_post_tag():
    form = PostTagForm()
    user_id = current_user.id
    new_post_tag = PostTag(
        postId=form.postId.data,
        type=form.type.data,
        description=form.description.data
    )
    db.session.add(new_post_tag)
    db.session.commit()
    return jsonify(new_post_tag.to_dict())

@post_tag_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post_tag(id):
    post_tag = PostTag.query.get(id)
    if not post_tag:
        return jsonify(error = 'PostTag not found'), 404
    db.session.delete(post_tag)
    db.session.commit()

    return jsonify(message = 'PostTag Deleted Successfully')
