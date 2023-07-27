from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Reply, db
from app.forms import ReplyForm
from datetime import datetime

reply_routes = Blueprint('replies', __name__)

@reply_routes.route('/')
@login_required
def replies():
    replies = Reply.query.all()
    return jsonify([reply.to_dict() for reply in replies])

@reply_routes.route('/<int:id>')
@login_required
def reply(id):
    reply = Reply.query.get(id)
    return reply.to_dict()

@reply_routes.route('/current')
@login_required
def user_replies():
    user_id = current_user.id
    replies = Reply.query.filter(Reply.userId == user_id).all()
    return jsonify([reply.to_dict() for reply in replies])

@reply_routes.route('/new', methods=['POST'])
@login_required
def add_reply():
    form = ReplyForm()
    user_id = current_user.id
    new_reply = Reply(
        userId=user_id,
        postId=form.postId.data,
        body=form.body.data,
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    db.session.add(new_reply)
    db.session.commit()
    return jsonify(new_reply.to_dict())

@reply_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_reply(id):
    reply = Reply.query.get(id)
    if reply:
        form = ReplyForm()
        user_id = current_user.id
        reply.body = form.body.data
        reply.updatedAt = datetime.now()
        db.session.commit()
        return jsonify(reply)
    else:
        return {'Error': "No Reply Found"}

@reply_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_reply(id):
    reply = Reply.query.get(id)
    if not reply:
        return jsonify(error = 'Reply not found'), 404
    db.session.delete(reply)
    db.session.commit()

    return jsonify(message = 'Reply Deleted Successfully')
