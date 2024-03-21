# Kapusta Projekt Welcome

Briefly describe your project here. A one- or two-sentence description that clearly explains what your project is about.

# Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- MongoDB set up either locally or a MongoDB Atlas account for cloud database.
- Basic understanding of Node.js and RESTful APIs.
- Installation

# Follow these steps to get your development environment running:

Clone the repository:
bash

- git clone [your-repo-link]
- cd [your-repo-directory]
- Install dependencies:
- npm install
- Set up environment variables:
- Rename .env.example to .env and update the variables to your specific environment settings.

DB_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Start the server:

- npm start
- For development, you might want to run: npm run start:dev

# Features

- Authentication: Includes endpoints for user registration, login, and logout, along with Google OAuth for additional login methods.
- Transaction Management: Allows users to add, delete, and view their income and expenses transactions.
- Category Management: Users can retrieve lists of predefined income and expense categories.
- Report Generation: Supports generating reports based on income and expenses over different periods and categories.
- User Profile: Endpoint to retrieve and update user information, particularly the balance.

# API Endpoints

- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Login a user.
- GET /api/auth/logout: Logout a user.
- GET /api/transactions: Fetch all transactions for the logged-in user.
- POST /api/transactions/income: Add a new income transaction.
- POST /api/transactions/expenses: Add a new expense transaction.
- GET /api/reports/income-by-period: Get income report for a specific period.
