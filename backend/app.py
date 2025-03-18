from typing import Any, Dict, Literal, Tuple
from flask import Flask, Response, request, jsonify, flash, session
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
from extensions import db
from decorators import require_auth
from flask_cors import CORS
from routes.account_routes import account_bp

def create_app():
    app = Flask(__name__)
    app.secret_key = 'Hello'
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///personal_finance.sqlite3'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "your-secret-key"  # Change this to a secure secret key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": ["http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    jwt = JWTManager(app)
    db.init_app(app)

    from models import User, Account, Category, Transaction

    # Register blueprints
    app.register_blueprint(account_bp)  # Remove the url_prefix parameter

    # Create database tables
    with app.app_context():
        db.create_all()

    # POST /users: Create a new user.
    @app.route(rule="/users", methods = ["POST"]) # type: ignore
    def create_user() -> Tuple[Any, int]:   
        try:
            data = request.get_json()
            if not data:
                return jsonify({"success": False, "error": "No data provided"}), 400
                
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            
            if not all([name, email, password]):
                return jsonify({"success": False, "error": "Missing required fields"}), 400
                
            # Check if user already exists
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                return jsonify({"success": False, "error": "Email already registered"}), 409
                
            user = User(name=name, email=email, password=password)
            db.session.add(user)
            db.session.commit()
            
            return jsonify({
                "success": True,
                "message": "User Created",
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({"success": False, "error": str(e)}), 500

    # GET /users/:id: Get user details by ID.
    @app.route(rule="/users/<id>", methods = ["GET"]) # type: ignore
    @require_auth
    def get_user(id) -> tuple[Any, Literal[201]]:
        user: Any = User.query.get(ident=id)    # user = User.query.filter_by(name=name).first()
        db.session.commit()
        return jsonify(user), 201

    # GET /users: Get a list of all users.
    @app.route("/users", methods = ["GET"])  # type: ignore
    @require_auth
    def get_all_users() -> tuple[Any, Literal[201]]:
        users = User.query.all()
        db.session.commit()
        return jsonify([user for user in users]), 201     # users will work too

    # PUT /users/:id: Update user details by ID.
    @app.route("/users/<int:id>", methods = ["PUT"]) # type: ignore
    def update_user(id) -> tuple[Any, Literal[201]]:
        user: Any = User.query.get(ident=id)
        data = request.get_json()
        print(user.name)
        if 'name' in data:
            user.name = data.get('name')
        if 'email' in data:
            user.email = data.get('email')
        if 'password' in data:
            user.set_password(data.get('password'))
        db.session.commit()
        return jsonify({"message":f"Info Updated Succssfully for user {id}"}), 201

    # DELETE /users/:id: Delete a user by ID.
    @app.route("/users/", methods=["DELETE"]) # type: ignore
    @require_auth
    def delete_user():
        try:
            user_id = request.args.get(key='id', type=int)
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404

            Category.query.filter_by(user_id=user_id).delete(synchronize_session=False)
            Account.query.filter_by(user_id=user_id).delete(synchronize_session=False)

            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': f'User and all related data deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

    # POST /users/login: User login (authenticate and generate a token).
    @app.route("/users/login", methods=["POST"])  # type: ignore
    def user_login() -> Tuple[Any, int]:
        try:
            data: Dict[str, Any] = request.get_json()
            email: Any = data.get('email')
            password: Any = data.get('password')

            if not email or not password:
                return jsonify({"success": False,'error': 'Email and password are required'}), 400

            user = User.query.filter_by(email=email).first()

            if user and user.check_password(password):
                access_token = create_access_token(identity=user.id)
                return jsonify({
                    "success": True,
                    "token": access_token,
                    "user": {
                        'id': user.id,
                        'name': user.name,
                        'email': user.email
                    }
                }), 200
            else:
                return jsonify({"success": False,'error': 'Invalid email or password'}), 401

        except Exception as e:
            return jsonify({"success": False,'error': str(e)}), 400

    # POST /users/logout: User logout (invalidate the session/token).
    @app.route("/users/logout", methods=["POST"])  # type: ignore
    @jwt_required()
    def user_logout() -> Tuple[Any, int]:
        # JWT tokens are stateless, so we don't need to do anything server-side
        # The client should remove the token
        return jsonify({'message': 'Successfully logged out'}), 200


    def create_sample_data() -> None:
        try:
            # Check if database is empty
            if User.query.first() is None:
                # Create sample users
                user1 = User(name="John Doe", email="john@example.com", password="securepassword123")        
                user2 = User(name="Jane Smith", email="jane@example.com", password="securepassword123")
                db.session.add_all([user1, user2])
                db.session.flush()  # This ensures IDs are generated before creating dependent records

                # Create sample categories
                categories = [
                    Category(name="Salary", description="Monthly income", user_id=user1.id),
                    Category(name="Food", description="Groceries and dining", user_id=user1.id),
                    Category(name="Transport", description="Bus and fuel costs", user_id=user1.id),
                    Category(name="Entertainment", description="Movies and games", user_id=user2.id)
                ]
                db.session.add_all(categories)
                db.session.flush()

                # Create sample accounts
                accounts = [
                    Account(user_id=user1.id, name="Main Account", balance=1000.0, account_type="Checking"),
                    Account(user_id=user1.id, name="Savings", balance=5000.0, account_type="Savings"),
                    Account(user_id=user2.id, name="Primary", balance=2000.0, account_type="Checking")
                ]
                db.session.add_all(accounts)
                db.session.flush()

                # Create sample transactions
                transactions = [
                    Transaction(account_id=accounts[0].id, type="deposit", amount=1000.0, 
                            description="Salary deposit", category_id=categories[0].id),
                    Transaction(account_id=accounts[0].id, type="withdraw", amount=-50.0, 
                            description="Grocery shopping", category_id=categories[1].id),
                    Transaction(account_id=accounts[1].id, type="deposit", amount=500.0, 
                            description="Savings transfer", category_id=categories[0].id)
                ]
                db.session.add_all(transactions)
                db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error creating sample data: {e}")
            raise

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

