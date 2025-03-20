from datetime import datetime, timezone
from extensions import db


class Account(db.Model):
    id = db.Column("id", db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    account_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone.utc), nullable=False)

    user = db.relationship("User", backref=db.backref("accounts", lazy=True))

    def __init__(self, user_id, name, balance, account_type):
        self.user_id = user_id
        self.name = name
        self.balance = balance
        self.account_type = account_type
        self.created_at = datetime.now(timezone.utc)

    def __repr__(self):
        return f"<Account {self.id}: {self.name} ({self.account_type})>"
