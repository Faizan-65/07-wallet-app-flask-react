from pathlib import Path
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from datetime import timedelta
from extensions import db
from flask_cors import CORS
from routes.account_routes import account_bp
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.transaction_routes import transaction_bp
from models import User, Account, Category, Transaction
from os import environ
from dotenv import load_dotenv
from werkzeug.exceptions import HTTPException


def create_app():
    load_dotenv()

    # Create data directory
    data_dir = Path(__file__).parent.parent/'backend'
    data_dir.mkdir(exist_ok=True)

    app = Flask(__name__)

    # Configuration
    app.config.update(
        SECRET_KEY=environ.get('SECRET_KEY', 'default-dev-key'),
        SQLALCHEMY_DATABASE_URI=environ.get(
            'DATABASE_URL', f'sqlite:///{data_dir}/wallet.db'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        JWT_SECRET_KEY=environ.get('JWT_SECRET_KEY', 'default-jwt-key'),
        JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1)
    )

    # Initialize extensions
    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": ["http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    JWTManager(app)
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(account_bp, url_prefix='/api/accounts')
    app.register_blueprint(transaction_bp, url_prefix='/api/transactions')
    # Initialize database
    with app.app_context():
        from models import User, Account, Category, Transaction
        db.create_all()
        create_sample_data()
    return app


def create_sample_data():
    try:
        # Check if database is empty
        if User.query.first() is None:
            # Create sample users
            user1 = User(name="John Doe", email="john@example.com",
                         password="securepassword123")
            user2 = User(name="Jane Smith", email="jane@example.com",
                         password="securepassword123")
            db.session.add_all([user1, user2])
            db.session.flush()  # This ensures IDs are generated before creating dependent records

            # Create sample categories
            categories = [
                Category(name="Salary",
                         description="Monthly income", user_id=user1.id),
                Category(
                    name="Food", description="Groceries and dining", user_id=user1.id),
                Category(name="Transport",
                         description="Bus and fuel costs", user_id=user1.id),
                Category(name="Entertainment",
                         description="Movies and games", user_id=user2.id)
            ]
            db.session.add_all(categories)
            db.session.flush()

            # Create sample accounts
            accounts = [
                Account(user_id=user1.id, name="Main Account",
                        balance=1000.0, account_type="Checking"),
                Account(user_id=user1.id, name="Savings",
                        balance=5000.0, account_type="Savings"),
                Account(user_id=user2.id, name="Primary",
                        balance=2000.0, account_type="Checking")
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


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
