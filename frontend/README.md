# Finance Assistant Frontend

AI-assisted personal finance application frontend built with React, Redux, and Tailwind CSS.

## Features

- User authentication (Login/Register)
- Dashboard with financial overview
- Expense tracking and management
- Income tracking and management
- Custom categories with icons and colors
- Analytics with interactive charts
- Responsive design (mobile-friendly)
- **Progressive Web App (PWA)** - Install on mobile devices!
- Dark mode support (coming soon)

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **Redux Persist** - Persist state to localStorage
- **React Router** - Routing
- **Axios** - HTTP client
- **Formik** - Form management
- **Yup** - Form validation
- **Material-UI** - Component library
- **Tailwind CSS** - Utility CSS
- **Recharts** - Data visualization
- **React Toastify** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Update `.env` file
   - Set `VITE_API_URL` to your backend URL (default: http://localhost:5000/api/v1)

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## PWA Installation

### On Mobile (Android/iOS)
1. Open the app in your mobile browser (Chrome/Safari)
2. Look for "Add to Home Screen" or "Install" option
3. Tap to install
4. The app will appear on your home screen like a native app!

### On Desktop
1. Open the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click to install
4. The app will open in its own window

## Project Structure

```
frontend/
├── public/               # Public assets
├── src/
│   ├── apis/            # API service files
│   │   ├── auth.api.js
│   │   ├── category.api.js
│   │   ├── expense.api.js
│   │   ├── income.api.js
│   │   └── statistics.api.js
│   ├── components/      # Reusable components
│   │   └── Layout/
│   │       └── Layout.jsx
│   ├── pages/           # Page components
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Categories/
│   │   │   └── Categories.jsx
│   │   ├── Expenses/
│   │   │   └── Expenses.jsx
│   │   ├── Incomes/
│   │   │   └── Incomes.jsx
│   │   └── Analytics/
│   │       └── Analytics.jsx
│   ├── routes/          # Routing configuration
│   │   └── ProjectRoutes.jsx
│   ├── store/           # Redux store
│   │   ├── store.js
│   │   └── features/
│   │       └── authSlice.js
│   ├── utils/           # Utility functions
│   │   └── axiosInstance.js
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── vite.config.js       # Vite configuration (includes PWA setup)
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## Pages

### Authentication
- **Login** - User login with email and password
- **Register** - New user registration

### Dashboard
- Financial summary (total income, expenses, balance)
- Recent transactions list
- Quick overview cards

### Categories
- Create custom categories for expenses and incomes
- Choose icons and colors
- Edit and delete categories
- Filter by type (expense/income)

### Expenses
- Add, edit, and delete expenses
- Categorize expenses
- Add notes and dates
- View all expenses in a table

### Incomes
- Add, edit, and delete incomes
- Categorize incomes
- Add notes and dates
- View all incomes in a table

### Analytics
- Monthly income vs expenses trend (line chart)
- Expenses by category (pie chart)
- Incomes by category (bar chart)
- Detailed category breakdowns

## State Management

The app uses Redux Toolkit with Redux Persist:
- **authSlice** - User authentication state (persisted)

State is automatically saved to localStorage and restored on page reload.

## API Integration

All API calls use axios with interceptors for:
- Adding JWT token to requests
- Handling 401 errors (auto-logout)
- Error response handling

## Form Validation

Forms use Formik + Yup for validation:
- Client-side validation
- Custom error messages
- Field-level and form-level validation

## Styling

The app uses Tailwind CSS for styling:
- Utility-first approach
- Responsive design
- Custom theme colors
- Hover and focus states

## Icons

Lucide React icons are used throughout the app:
- Lightweight and customizable
- Consistent design language
- Wide variety of icons

## Notifications

React Toastify is used for notifications:
- Success messages
- Error messages
- Auto-dismiss
- Customizable position

## PWA Features

- **Offline support** - Works without internet (cached assets)
- **Installable** - Can be installed on mobile and desktop
- **App-like experience** - Runs in standalone mode
- **Fast loading** - Assets are cached for quick access
- **Responsive** - Adapts to any screen size

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Next Steps

- Add Gemini AI chatbot integration (as requested by user)
- Implement data export (CSV, PDF)
- Add dark mode
- Implement budget planning
- Add recurring transactions
- Implement notifications for budget limits
