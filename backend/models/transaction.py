from datetime import datetime, timezone
from extensions import db

class Transaction(db.Model):
    id = db.Column("id", db.Integer, primary_key = True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=False)
    type = db.Column(db.String(20), nullable = False)
    amount = db.Column(db.Float, nullable = False)
    description = db.Column(db.String(200), nullable = False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), 
                           onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    account = db.relationship("Account", backref = db.backref("transactions", lazy = True))
    category = db.relationship("Category", backref=db.backref("transactions", lazy=True))

    def __init__(self, account_id, type, amount, description, category_id ):
        self.account_id = account_id
        self.type = type
        self.amount = amount
        self.description = description
        self.category_id = category_id
        self.timestamp = datetime.now(timezone.utc)
        self.created_at = datetime.now(timezone.utc)
    def to_dict(self):
        return {
            'id': self.id,
            'account_id': self.account_id,
            'type': self.type,
            'amount': float(self.amount),  # Convert Decimal to float for JSON serialization
            'description': self.description,
            'category_id': self.category_id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

