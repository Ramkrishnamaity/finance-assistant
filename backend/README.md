# Finance Assistant Backend

AI-assisted personal finance application backend built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Categories management (custom user categories)
- Expense tracking with categories
- Income tracking with categories
- Financial statistics and analytics
- RESTful API architecture
- Input validation with Joi/Celebrate
- Error handling middleware
- Soft deletes

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi/Celebrate** - Validation
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Morgan** - Request logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` file and update values
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a secure random string

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (protected)

### Categories
- `GET /api/v1/categories` - Get all categories (with optional type filter)
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create new category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category (soft delete)

### Expenses
- `GET /api/v1/expenses` - Get all expenses (with optional filters)
- `GET /api/v1/expenses/:id` - Get expense by ID
- `POST /api/v1/expenses` - Create new expense
- `PUT /api/v1/expenses/:id` - Update expense
- `DELETE /api/v1/expenses/:id` - Delete expense (soft delete)

### Incomes
- `GET /api/v1/incomes` - Get all incomes (with optional filters)
- `GET /api/v1/incomes/:id` - Get income by ID
- `POST /api/v1/incomes` - Create new income
- `PUT /api/v1/incomes/:id` - Update income
- `DELETE /api/v1/incomes/:id` - Delete income (soft delete)

### Statistics
- `GET /api/v1/statistics/summary` - Get financial summary
- `GET /api/v1/statistics/expenses-by-category` - Get expenses grouped by category
- `GET /api/v1/statistics/incomes-by-category` - Get incomes grouped by category
- `GET /api/v1/statistics/monthly-trend` - Get monthly income/expense trend
- `GET /api/v1/statistics/recent-transactions` - Get recent transactions

## Project Structure

```
backend/
├── app.js                  # Express app setup
├── server.js               # Entry point
├── config/
│   └── db.js              # MongoDB connection
├── models/                # Mongoose models
│   ├── user.model.js
│   ├── category.model.js
│   ├── expense.model.js
│   └── income.model.js
├── controllers/           # Request handlers
├── services/              # Business logic
├── routes/                # API routes
├── middlewares/           # Custom middleware
│   └── auth.middleware.js
├── common/
│   ├── helpers/          # Utility functions
│   │   ├── controller.js
│   │   ├── errorHandler.js
│   │   └── statusError.js
│   └── schemas/          # Joi validation schemas
└── package.json
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-assistant
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

## Database Models

### User
- name, email, password, freezed, timestamps

### Category
- name, type (expense/income), icon, color, userId, freezed, timestamps

### Expense
- amount, description, date, categoryId, userId, notes, freezed, timestamps

### Income
- amount, description, date, categoryId, userId, notes, freezed, timestamps

## Authentication

All protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "status": false,
  "message": "Error description"
}
```

## Success Responses

Success responses follow this format:

```json
{
  "status": true,
  "message": "Operation successful",
  "data": { ... }
}
```

## Next Steps

- Add Gemini AI chatbot integration (as requested by user)
- Implement data export functionality
- Add budget planning features
- Implement recurring transactions
