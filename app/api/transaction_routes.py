from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Transaction, db
from app.forms import TransactionForm
from datetime import datetime

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/')
@login_required
def transactions():
    transactions = Transaction.query.all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/<int:id>')
@login_required
def transaction(id):
    transaction = Transaction.query.get(id)
    return jsonify(transaction)

@transaction_routes.route('/<int:id>/fulfil')
@login_required
def fulfil_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction.type != 'pledge' and transaction.transactionDate:
        return {'message': 'Pledge already fulfilled'}
    else:
        transaction.type = 'payed'
        transaction.transactionDate = datetime.now()
        db.session.commit()
        return {'message': 'Pledge marked Fulfilled!'}

@transaction_routes.route('/current')
@login_required
def user_transactions():
    user_id = current_user.id
    transactions = Transaction.query.filter(Transaction.userId == user_id).all()
    return {'transactions': [transaction.to_dict() for transaction in transactions]}

@transaction_routes.route('/new', methods=['POST'])
@login_required
def add_transaction():
    user_id = current_user.id
    form = TransactionForm()
    new_transaction = Transaction(
        userId=user_id,
        postId=form.postId.data,
        value=form.value.data,
        fee=form.fee.data,
        description=form.description.data,
        entryDate=datetime.now(),
        type='pledge'
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify(new_transaction)
@transaction_routes.route('/<int:id>/edit')
@login_required
def edit_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction:
        user_id = current_user.id
        form = TransactionForm()
        transaction.value=form.value.data
        transaction.fee=form.fee.data
        transaction.description=form.description.data
        db.session.commit()
        return jsonify(transaction)
    else:
        return {'Error': "No Transaction Found"}

@transaction_routes.route('/<int:id>/delete')
@login_required
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return jsonify(error = 'Transaction not found'), 404
    db.session.delete(transaction)
    db.session.commit()

    return jsonify(message = 'Transaction Deleted Successfully')
