from extensions import db


class Account(db.Model):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    account_type = db.Column(db.String(80), nullable=False)

    def __init__(self, user_id, name, balance, account_type):
        self.user_id = user_id
        self.name = name
        self.balance = balance
        self.account_type = account_type

    def to_dict(self):
        """Convert account object to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'balance': self.balance,
            'account_type': self.account_type
        }
