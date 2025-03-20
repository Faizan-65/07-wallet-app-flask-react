from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from extensions import db
from models import User
from email_validator import validate_email, EmailNotValidError

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({"success": False, "error": "Missing required fields"}), 400

        # Validate email format
        try:
            validate_email(email)
        except EmailNotValidError:
            return jsonify({"success": False, "error": "Invalid email format"}), 400

        # Validate password strength
        if len(password) < 8:
            return jsonify({"success": False, "error": "Password must be at least 8 characters"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"success": False, "error": "Email already registered"}), 409

        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "User registered successfully"
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        # print(f"{email} {password} {data}")
        if not email or not password:
            return jsonify({"success": False, "error": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            access_token = create_access_token(identity=str(user.id))
            return jsonify({
                "success": True,
                "token": access_token,
                "user": {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email
                }
            }), 200
        return jsonify({"success": False, "error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"success": True, "message": "Successfully logged out"}), 200
