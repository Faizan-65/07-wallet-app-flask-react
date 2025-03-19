# SmartBank - Personal Finance Manager

A full-stack personal finance management system built with Flask and React that helps users track income, expenses, and balances across multiple accounts.

## 🚀 Quick Start

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```
The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Create a new user | No |
| GET | `/users/:id` | Get user details by ID | Yes |
| GET | `/users` | Get list of all users | Yes |
| PUT | `/users/:id` | Update user details | Yes |
| DELETE | `/users/:id` | Delete a user | Yes |
| POST | `/users/login` | User login | No |
| POST | `/users/logout` | User logout | Yes |

### Account Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/accounts` | Create new account | Yes |
| GET | `/accounts/:id` | Get account details | Yes |
| GET | `/accounts/user/:user_id` | Get user's accounts | Yes |
| PUT | `/accounts/:id` | Update account | Yes |
| DELETE | `/accounts/:id` | Delete account | Yes |

### Transaction Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/transactions` | Create transaction | Yes |
| GET | `/transactions/:id` | Get transaction details | Yes |
| GET | `/transactions/account/:account_id` | Get account transactions | Yes |
| GET | `/transactions/category/:category_id` | Get category transactions | Yes |
| GET | `/transactions/user/:user_id` | Get user transactions | Yes |
| PUT | `/transactions/:id` | Update transaction | Yes |
| DELETE | `/transactions/:id` | Delete transaction | Yes |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/categories` | Create category | Yes |
| GET | `/categories/:id` | Get category details | Yes |
| GET | `/categories/user/:user_id` | Get user categories | Yes |
| PUT | `/categories/:id` | Update category | Yes |
| DELETE | `/categories/:id` | Delete category | Yes |

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 🛠 Project Structure

```
wallet-app-flask-react/
├── backend/
│   ├── routes/
│   │   ├── account_routes.py
│   │   ├── transaction_routes.py
│   │   └── category_routes.py
│   ├── models/
│   │   ├── user.py
│   │   ├── account.py
│   │   └── transaction.py
│   └── app.py
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── store/
    └── package.json
```

## 🔑 Environment Variables

Backend (`.env`):
```
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///wallet.db
JWT_SECRET_KEY=your-secret-key
```

Frontend (`.env`):
```
VITE_API_URL=http://localhost:5000
```

## 📝 License

MIT

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
