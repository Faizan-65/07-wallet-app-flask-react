from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Account
from extensions import db
from sqlalchemy.exc import SQLAlchemyError

account_bp = Blueprint("accounts", __name__)


@account_bp.route("", methods=["GET"])
@jwt_required()
def get_user_accounts():
    try:
        user_id = int(get_jwt_identity())

        accounts = Account.query.filter_by(user_id=user_id).all()
        print(f"Number of accounts found: {len(accounts)}")
        accounts = Account.query.filter_by(user_id=user_id).all()

        accounts_list = [{
            "id": account.id,
            "name": account.name,
            "balance": account.balance,
            "account_type": account.account_type
        } for account in accounts]

        return jsonify({
            "success": True,
            "accounts": accounts_list
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


@account_bp.route("", methods=["POST"])
@jwt_required()
def create_account():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'balance', 'account_type']
        if not all(field in data for field in required_fields):
            return jsonify({
                "success": False,
                "error": "Missing required fields"
            }), 400

        account = Account(
            user_id=user_id,
            name=data['name'],
            balance=data['balance'],
            account_type=data['account_type']
        )

        db.session.add(account)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Account created",
            "account": {
                "id": account.id,
                "name": account.name,
                "balance": account.balance,
                "account_type": account.account_type
            }
        }), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"success": False, "error": "Database error occurred"}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 400


@account_bp.route("/delete", methods=["DELETE"])
@jwt_required()
def delete_account():
    try:
        user_id = get_jwt_identity()
        account_id = request.get_json().get("account_id")
        account = Account.query.filter(
            Account.id == account_id, Account.user_id == user_id).first()
        if not account:
            return jsonify({"success": False, "error": "Account not found"}), 404
        db.session.delete(account)
        db.session.commit()
        return jsonify(({"sesccess": True, "message": "Account deleted successfully"})), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
