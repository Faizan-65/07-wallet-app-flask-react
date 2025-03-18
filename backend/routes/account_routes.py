from flask import Blueprint, request, jsonify
from models import Account
from extensions import db

account_bp = Blueprint("accounts", __name__)

@account_bp.route("/accounts", methods = ["GET", "POST"]) # type: ignore
def accounts():
  try:
    if request.method == "GET": # gets accounts by user_id
      user_id = request.args.get("user_id", type=int)
      all_user_accounts = db.Account.get(user_id)
      return jsonify({"success":True, "message":"Accounts Retreived", accounts:all_user_accounts}), 201

    if request.method == "POST":   # makes user
      data = request.get_json()
      user_id = data.get("user_id")
      name = data.get("name")
      balance = data.get("balance")
      account_type = data.get("account_type")

      if not all([user_id, name, balance, account_type]):
        return jsonify({"success":False, "error":"Important information missing"}), 401
      account = Account(user_id, name, balance, account_type)

      db.session.add(account)
      db.session.commit()
      return jsonify({"success":True, "error":"Account Created"}), 201
  except Exception as e:
    return jsonify({"success":False, "error":"Error creating account"}), 401
