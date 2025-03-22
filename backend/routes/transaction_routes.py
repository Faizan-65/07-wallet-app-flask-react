from datetime import datetime
from sys import exception
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Transaction


transaction_bp = Blueprint("transaction", __name__)


@transaction_bp.route("", methods=["GET"])
@jwt_required()
def get_acc_transactions():
    try:
        account_id = request.get_json().get("account_id")
        transactions = Transaction.query.filter(
            Transaction.account_id == account_id).all()         # type: ignore
        transactions_list = [{
            "account_id": transaction.account_id,
            "type": transaction.type,
            "amount": transaction.amount

        }for transaction in transactions]
        if transactions:
            return jsonify({"success": True, "transactions": transactions_list}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@transaction_bp.route("", methods=["POST"])
def create_transaction():
    try:
        data  = request.get_json()
        transaction_acc_id = data["account_id"]
        transaction_type = data["type"]
        transaction_amount = data["amount"]
        transaction_description = data["description"]
        transaction_category = data["category_id"]
        transaction_timestamp = data["timestamp"]
        if not all([transaction_type, transaction_amount, transaction_description,transaction_category, transaction_timestamp]):
            return jsonify({"success":False, "error":"Required field missing"})
        transaction = Transaction(account_id=transaction_acc_id, 
                                  type=transaction_type, 
                                  amount=transaction_amount, 
                                  description=transaction_description, 
                                  category_id = transaction_category)
        db.session.add(transaction)
        db.session.commit()
        return jsonify({"success":True, "message":"Transaction added. "})
    except Exception as e:
        return jsonify({"success":False, "error":str(e)})

@transaction_bp.route("<id>", methods=["GET"])
def get_transaction_by_id(id):
    try:
        # transaction_id = request.args.get("id")
        transaction_id = id
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return jsonify({"success":False, "error":"Transaction not shound"})
        return jsonify({"success":True, "message":transaction.to_dict()})
    except Exception as e:
        return jsonify({"success":False, "error":str(e)})

@transaction_bp.route("/category/<int:id>", methods=["GET"])
def get_transactions_by_category(id):
    try:
        category_id = id
        transactions = Transaction.query.filter_by(category_id = category_id).all()
        if not transactions:
            return jsonify({"success":False, "error":"Transactions not found"})
        transactions_list = [transaction.to_dict() for transaction in transactions]
        return jsonify({"success":True, "message":transactions_list})
    except Exception as e:
        return jsonify({"success":False, "error":str(e)})

@transaction_bp.route("", methods=["PUT"])
def update_transaction():
    try:
        data = request.get_json()
        transaction_id = request.args.get("id", type=int)
        transaction_type = data["type"]
        transaction_amount = data["amount"]
        transaction_description = data["description"]
        transaction_category = data["category_id"]
        transaction_timestamp = data["timestamp"]
        if transaction_timestamp:
            transaction_timestamp = datetime.fromisoformat(transaction_timestamp)

        if not all([transaction_type, transaction_amount, transaction_description,transaction_category, transaction_timestamp]):
            return jsonify({"success":False, "error":"Important information is missing"})
        
        transaction = Transaction.query.get(transaction_id)
        transaction.type = transaction_type
        transaction.amount=transaction_amount 
        transaction.description=transaction_description 
        transaction.category_id=transaction_category 
        transaction.timestamp=transaction_timestamp 
        db.session.commit()
        return jsonify({"success":False, "error":"Transaction Updated successfully"})
    except Exception as e:
        return jsonify({"success":False, "error":str(e)})


@transaction_bp.route("", methods=["DELETE"])
def delete_transaction():
    try:
        transaction_id = request.args.get("id", type=int)
        transaction = Transaction.query.get(transaction_id)
        if transaction:
            db.session.delete(transaction)
            db.session.commit()
            return jsonify({"success": True, "message": "Record Deleted successfully"})
        else:
            return jsonify({"success": False, "error": "Transaction not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
