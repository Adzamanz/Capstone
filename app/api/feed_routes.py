from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Feed, db
from app.forms import FeedForm

feed_routes = Blueprint('/feeds', __name__)

@feed_routes.route('/')
@login_required
def feeds():
    feeds = Feed.query.all()
    return jsonify([feed.to_dict() for feed in feeds])

@feed_routes.route('/<int:id>')
@login_required
def user(id):
    feed = Feed.query.get(id)
    return feed.to_dict()

@feed_routes.route('/current')
@login_required
def user_feeds():
    user_id = current_user.id
    feeds = Feed.query.filter(Feed.userId == user_id).all()
    return jsonify([feed.to_dict() for feed in feeds])

@feed_routes.route('/new', methods=['POST'])
@login_required
def add_feed():
    form = FeedForm()
    user_id = current_user.id

    new_feed = Feed(
        userId=user_id,
        description=form.description.data,
        type=form.type.data
    )
    db.session.add(new_feed)
    db.session.commit()
    return jsonify(new_feed)

@feed_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_feed(id):
    feed = Feed.query.get(id)
    if feed:
        form = FeedForm()
        feed.description=form.description.data
        feed.type=form.type.data
        db.session.commit()
        return jsonify(feed)
    else:
        return {'Error': "No Feed Found"}

@feed_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_feed(id):
    feed = Feed.query.get(id)
    if not feed:
        return jsonify(error = 'Feed not found'), 404
    db.session.delete(feed)
    db.session.commit()

    return jsonify(message = 'Feed Deleted Successfully')
