from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import Transaction


transaction_bp = Blueprint("transaction", __name__)


@transaction_bp.route("", methods=["GET"])
@jwt_required()
def get_user_transactions():
    try:
        account_id = request.get_json().get("account_id")
        transactions = Transaction.query.filter(
            Transaction.account_id == account_id).all()
        transactions_list = [{
            "account_id": transaction.account_id,
            "type": transaction.type,
            "amount": transaction.amount

        }for transaction in transactions]
        if transactions:
            return jsonify({"success": True, "transactions": transactions_list}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
