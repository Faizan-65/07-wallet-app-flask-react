from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import User, Category, Account

user_bp = Blueprint("users", __name__)

# Create is handled by auth routes

@user_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_user(id):
    print("jtthtdcnhcn")
    try:
        user = User.query.get(id)

        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404
        return jsonify({"success": True, "user": user.to_dict()}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


@user_bp.route("", methods=["GET"])
@jwt_required()
def get_all_users():
    try:
        users = User.query.all()
        return jsonify({"success": True, "users": [user.to_dict() for user in users]}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


@user_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    try:
        user = User.query.get(id)
        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404

        data = request.get_json()
        if 'name' in data:
            user.name = data.get('name')
        if 'email' in data:
            user.email = data.get('email')
        if 'password' in data:
            user.set_password(data.get('password'))

        db.session.commit()
        return jsonify({"success": True, "message": f"User {id} updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 400


@user_bp.route("", methods=["DELETE"])
@jwt_required()
def delete_user():
    try:
        user_id = request.args.get('id', type=int)
        print(user_id)
        user = User.query.get(user_id)
        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404

        Category.query.filter_by(user_id=user_id).delete(
            synchronize_session=False)
        Account.query.filter_by(user_id=user_id).delete(
            synchronize_session=False)
        db.session.delete(user)
        db.session.commit()

        return jsonify({"success": True, "message": "User and related data deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 400
