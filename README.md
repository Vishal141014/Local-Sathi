# Local Sathi - AI-powered Customer Support

Local Sathi is an AI-powered customer support platform designed for small businesses in India. It provides chatbot services for WhatsApp, Telegram, and other messaging platforms to help businesses automate customer interactions.

## Demo & Live Examples

### Try Our Demo Bot
Experience Local Sathi in action with our demo bot on Telegram:

- **Telegram Bot**: [LocalSathiBot](https://t.me/LocalSathiBot)

Simply click the link above to start interacting with our demo bot and see the capabilities of Local Sathi firsthand.

## Features

- **Instant Reply**: Respond to customer queries 24/7 without delays
- **Human Handoff**: Seamlessly transfer complex conversations to your team
- **Insights & Analytics**: Analyze customer queries to improve your business
- **Multi-language Support**: Support customers in English, Hindi, Bengali, Marathi and other languages
- **Voice Interactions**: Enable voice-based conversations for accessibility
- **Custom Branding**: Customize the chatbot with your business identity

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/local-sathi.git
cd local-sathi
```

2. Install dependencies for both frontend and backend
```
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
NODE_ENV=development
PORT=5003
MONGO_URI=mongodb://localhost:27017/local-sathi
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

4. Run the application
```
# Run backend
cd backend
npm run dev

# Run frontend in a new terminal
cd frontend
npm start
```

## Default Admin Access
The system creates a default admin user on startup:
- Username: `syntax@team.com`
- Password: `200314`

## Admin Dashboard Features
The admin dashboard provides access to:
1. **User Management** - View and manage all registered users
2. **Subscription Verification** - Approve pending subscriptions
3. **Contact Form Management** - View, respond to, and track user messages
4. **Revenue Tracking** - Monitor subscription revenue by plan type
5. **Analytics** - View detailed user, subscription, and contact statistics
6. **Message Reply System** - Reply directly to contact form submissions
7. **Plan Verification** - Approve user subscription plans

The admin dashboard is completely separate from the regular user dashboard and provides comprehensive tools for site management.

## User Dashboard Features
Regular users have access to:
1. **Subscription Management** - View active and pending subscriptions
2. **Plan Status** - See verification status of subscription plans
3. **Subscription History** - View past subscription activity

## Subscription Plans
Users can subscribe to different plans, which require admin verification before activation. Once verified, subscriptions provide access to premium features for 30 days.

## Deployment on Vercel

### Backend Deployment

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one

2. Install Vercel CLI:
```
npm install -g vercel
```

3. Navigate to the backend directory and create a `vercel.json` file:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

4. Deploy to Vercel:
```
cd backend
vercel
```

5. Follow the CLI prompts to deploy

### Frontend Deployment

1. Create an `.env.production` file in the frontend directory:
```
REACT_APP_API_URL=https://your-backend-vercel-url.vercel.app/api
```

2. Build and deploy the frontend:
```
cd frontend
npm run build
vercel --prod
```

### Important Notes for Vercel Deployment

1. Update the MongoDB connection to use a cloud database like MongoDB Atlas
2. Update CORS settings in the backend to allow your frontend Vercel domain
3. Set up environment variables in the Vercel dashboard:
   - MONGO_URI
   - JWT_SECRET
   - JWT_EXPIRE
   - NODE_ENV=production

## Troubleshooting Common Issues

### Registration/Login Problems
If you encounter registration or login issues, try these steps:
1. Ensure MongoDB is running locally with `mongod` command
2. Check that the backend is running on port 5003
3. Verify the frontend proxy in package.json points to http://localhost:5003
4. If registering, make sure all required fields have valid data
5. For admin login, use exactly `syntax@team.com` (case-sensitive) and password `2003`
6. Clear your browser cookies and local storage, then try again

### API Connection Issues
If the frontend can't connect to the backend:
1. Check the backend console for any connection errors
2. Verify MongoDB is running and accessible
3. Try accessing the health check endpoint at http://localhost:5003/api/health
4. Restart both frontend and backend servers

### Server Structure
The backend has been rebuilt with a simplified architecture:
- Clean JWT authentication
- Improved error handling
- Better validation
- Default admin user creation
- Health check endpoint

## Project Structure

```
local-sathi/
├── frontend/              # React frontend
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── assets/        # Images, fonts, etc.
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       └── ...            # Other frontend files
├── backend/               # Node.js backend
│   ├── src/               # Backend source files
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # API controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── server.js      # Main server file
│   └── ...                # Other backend files
└── ...                    # Root files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user

### Subscriptions
- `POST /api/subscriptions` - Create a new subscription
- `GET /api/subscriptions` - Get all subscriptions (admin) or user subscriptions
- `GET /api/subscriptions/:id` - Get a single subscription
- `PUT /api/subscriptions/:id/verify` - Verify a subscription (admin)
- `GET /api/subscriptions/reference/:reference` - Get subscription by reference
- `GET /api/subscriptions/active` - Get user's active subscription

## Pricing Plans

### Basic - ₹599/month
- Telegram Integration
- Single Language Support
- Up to 500 messages/month
- Basic Analytics
- Email Support

### Business - ₹999/month
- Premium customer support
- Full service access
- Priority request handling
- Extended hours assistance
- 24/7 local assistance
- And more

### Premium - ₹1499/month
- All Business Features
- Multi-Language Support
- Unlimited Messages
- Multiple Team Members
- Custom Integrations
- Dedicated Account Manager
- 24/7 Priority Support

### Enterprise - ₹2599/month
- All Premium Features
- White-label Solution
- Custom Development
- On-premise Option
- SLA Guarantees
- API Access
- Enterprise Support

## License

This project is licensed under the MIT License - see the LICENSE file for details.
