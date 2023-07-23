from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db
from app.forms import TagForm

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/')
@login_required
def tags():
    tags = Tag.query.all()
    return {'tags': [tag.to_dict() for tag in tags]}

@tag_routes.route('/<int:id>')
@login_required
def tag(id):
    tag = Tag.query.get(id)
    return tag.to_dict()

@tag_routes.route('/current')
@login_required
def user_tags():
    user_id = current_user.id
    tags = Tag.query.filter(Tag.userId == user_id).all()
    return {tags: [tag.to_dict() for tag in tags]}

@tag_routes.route('/new', methods=['POST'])
@login_required
def add_tag():
    form = TagForm()
    user_id = current_user.id
    new_tag = Tag(
        userId=user_id,
        postId=form.postId.data,
        tagId=form.tagId.data,
        description=form.description.data
    )
    db.session.add(new_tag)
    db.session.commit()
    return jsonify(new_tag)

@tag_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_tag(id):
    tag = Tag.query.get(id)
    if not tag:
        return jsonify(error = 'Post not found'), 404
    db.session.delete(tag)
    db.session.commit()

    return jsonify(message = 'Tag Deleted Successfully')
