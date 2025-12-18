# Finance Assistant

An AI-assisted personal finance application with expense and income tracking, analytics dashboard, and AI chatbot support. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (JWT-based)
- Expense and income tracking
- Custom categories with icons and colors
- Financial analytics with interactive charts
- Real-time statistics dashboard
- **Progressive Web App (PWA)** - Install on mobile!
- Responsive design for all devices
- AI chatbot for natural language queries (coming soon)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Joi/Celebrate for validation

### Frontend
- React 19 with Vite
- Redux Toolkit for state management
- React Router for navigation
- Formik + Yup for forms
- Material-UI + Tailwind CSS
- Recharts for data visualization
- PWA support (installable)

### AI Integration (Coming Soon)
- Gemini API for AI chatbot

## Project Structure

```
finance-assistant/
├── backend/          # Node.js + Express backend
├── frontend/         # React + Vite frontend
├── backend_demo/     # Reference demo backend
├── frontend_demo/    # Reference demo frontend
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (update `.env` file):
```env
MONGODB_URI=mongodb://localhost:27017/finance-assistant
JWT_SECRET=your-secret-key
PORT=5000
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (update `.env` file):
```env
VITE_API_URL=http://localhost:5000/api/v1
```

4. Start the frontend dev server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile

### Categories Endpoints
- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Expenses Endpoints
- `GET /api/v1/expenses` - Get all expenses
- `POST /api/v1/expenses` - Create expense
- `PUT /api/v1/expenses/:id` - Update expense
- `DELETE /api/v1/expenses/:id` - Delete expense

### Incomes Endpoints
- `GET /api/v1/incomes` - Get all incomes
- `POST /api/v1/incomes` - Create income
- `PUT /api/v1/incomes/:id` - Update income
- `DELETE /api/v1/incomes/:id` - Delete income

### Statistics Endpoints
- `GET /api/v1/statistics/summary` - Get financial summary
- `GET /api/v1/statistics/expenses-by-category` - Expenses breakdown
- `GET /api/v1/statistics/incomes-by-category` - Incomes breakdown
- `GET /api/v1/statistics/monthly-trend` - Monthly trends
- `GET /api/v1/statistics/recent-transactions` - Recent transactions

## PWA Installation

### Mobile Installation (Android/iOS)

1. Open the app in your mobile browser (Chrome on Android, Safari on iOS)
2. For **Android Chrome**:
   - Tap the menu icon (⋮) in the top-right
   - Select "Add to Home screen" or "Install app"
   - Tap "Add" or "Install"

3. For **iOS Safari**:
   - Tap the Share button at the bottom
   - Scroll down and tap "Add to Home Screen"
   - Tap "Add"

4. The app icon will appear on your home screen
5. Tap the icon to open the app in standalone mode (looks like a native app!)

### Desktop Installation (Chrome/Edge)

1. Open the app in Chrome or Edge browser
2. Look for the install icon in the address bar (usually on the right)
3. Click the icon and select "Install"
4. The app will open in its own window

## Features Breakdown

### Dashboard
- Total income, expenses, and balance
- Transaction count
- Recent transactions list
- Color-coded statistics

### Categories Management
- Create custom categories for expenses and incomes
- Choose from emoji icons
- Select custom colors
- Edit and delete categories
- Filter by type

### Expense & Income Tracking
- Add transactions with amount, description, date, and category
- Optional notes field
- Edit and delete transactions
- View all transactions in sortable tables
- Date filtering

### Analytics
- Monthly income vs expenses line chart
- Expenses by category pie chart
- Incomes by category bar chart
- Detailed category-wise breakdowns
- Visual insights into spending patterns

### Progressive Web App
- Works offline (cached assets)
- Installable on mobile and desktop
- Fast loading
- App-like experience
- Responsive design

## Demo Credentials

For testing purposes, register a new account or use:
- Email: demo@example.com (Register first to create)
- Password: demo123

## Future Enhancements

1. **AI Chatbot Integration** (Next Priority)
   - Natural language queries about finances
   - Gemini API integration
   - Ask questions like "How much did I spend on food last month?"

2. **Additional Features**
   - Budget planning and tracking
   - Recurring transactions
   - Data export (CSV, PDF)
   - Email notifications
   - Dark mode
   - Multi-currency support
   - Bill reminders

## Code Structure & Patterns

The project follows clean architecture patterns:

- **Backend**: MVC pattern with services layer
  - Controllers → Services → Models
  - Middleware for authentication and validation
  - Error handling middleware
  - Soft deletes using `freezed` field

- **Frontend**: Component-based architecture
  - Redux for state management
  - Formik + Yup for form handling
  - Axios interceptors for API calls
  - Protected and public routes

## Contributing

This is a demo/learning project. Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for learning and development.

## Contact & Support

For questions or issues:
- Create an issue in the repository
- Check the backend and frontend README files for detailed documentation

## Acknowledgments

- Demo projects (frontend_demo and backend_demo) provided reference structure
- Material-UI for beautiful components
- Recharts for data visualization
- Tailwind CSS for styling
- Gemini AI (to be integrated)

---

**Note**: The AI chatbot with Gemini integration is planned for the next phase. Let me know when you're ready to proceed with the chatbot implementation!
