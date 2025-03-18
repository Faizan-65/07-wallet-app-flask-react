from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db

class User(db.Model):
    id = db.Column("id", db.Integer, primary_key = True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    balance = db.Column(db.Float, default=0.0)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), 
                          onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    def set_password(self, password):
        self.password_hash  = generate_password_hash(password=password)
    
    def check_password(self, password):# -> Any
        return check_password_hash(pwhash=self.password_hash, password=password)

    def __init__(self, name, email, password, balance=0.0):
        self.name = name
        self.email = email
        self.balance = balance
        self.set_password(password)
        self.created_at = datetime.now(timezone.utc)
        self.updated_at = datetime.now(timezone.utc)


        # Manually implemented __repr__ for dataclass behavior (string representation)
    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, balance={self.balance}, created_at={self.created_at}, updated_at={self.updated_at})>"

    # Manually implemented __eq__ for dataclass behavior (comparison)
    def __eq__(self, other):
        if isinstance(other, User):
            return self.id == other.id
        return False

    # Manually implemented __hash__ for dataclass behavior (hashing)
    def __hash__(self):
        return hash(self.id)
