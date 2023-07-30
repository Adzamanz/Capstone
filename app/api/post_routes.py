from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, db
from app.forms import PostForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)

#get all posts
@post_routes.route('/')
@login_required
def posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

@post_routes.route('/<int:id>')
@login_required
def post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/current')
@login_required
def user_posts():
    user_id = current_user.id
    posts = Post.query.filter(Post.userId == user_id).all()
    return jsonify([post.to_dict() for post in posts])

@post_routes.route('/new', methods=['POST'])
@login_required
def add_post():
    form = PostForm()
    user_id = current_user.id

    new_post = Post(
        userId=user_id,
        feedId=form.feedId.data,
        date=form.date.data,
        type=form.type.data,
        title=form.title.data,
        body=form.body.data,
        reply=form.reply.data,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.to_dict())

@post_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    if Post:
        form = PostForm()
        post.feedId=form.feedId.data
        post.date=form.date.data
        post.type=form.type.data
        post.title=form.title.data
        post.body=form.body.data
        post.reply=form.reply.data
        post.updatedAt=datetime.now()

        db.session.commit()

        return jsonify(post.to_dict())
    else:
        return {'Error': "No Post Found"}

@post_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify(error = 'Post not found'), 404
    db.session.delete(post)
    db.session.commit()

    return jsonify(message = 'Post Deleted Successfully')
