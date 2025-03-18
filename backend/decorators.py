from functools import wraps
from typing import Callable, Any
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models import User

def require_auth(func: Callable) -> Callable:
    """
    Custom authentication decorator that:
    1. Verifies JWT token
    2. Checks if user exists in database
    3. Returns 401 if authentication fails
    """
    @wraps(func)
    def decorated(*args: Any, **kwargs: Any) -> Any:
        try:
            # First verify the JWT token
            verify_jwt_in_request()
            
            # Get user ID from token
            current_user_id = get_jwt_identity()
            
            # Check if user still exists in database
            user = User.query.get(current_user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 401
                
            return func(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Authentication required'}), 401
            
    return decorated
