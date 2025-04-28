# Deployment Guide for Local Sathi

This guide will help you deploy the Local Sathi application to Vercel.

## Prerequisites

1. A Vercel account - Sign up at [vercel.com](https://vercel.com) if you don't have one
2. Vercel CLI installed - `npm install -g vercel`
3. A MongoDB Atlas account for cloud database - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Backend Deployment Steps

1. Set up MongoDB Atlas:
   - Create a new cluster
   - Create a database user with read/write permissions
   - Configure network access (IP whitelist or allow from anywhere)
   - Get your connection string and replace `YOUR_MONGODB_ATLAS_CONNECTION_STRING` in `backend/vercel.json`

2. Deploy the backend:
   ```
   cd backend
   vercel login
   vercel
   ```

3. Follow the prompts for deployment settings:
   - Set the project name
   - Confirm the directory to deploy (backend)
   - Link to your existing project or create a new one
   - Override settings from vercel.json if needed

4. Once deployed, you'll get a production URL. Save this URL for the frontend configuration.

## Frontend Deployment Steps

1. Create an `.env.production` file in the frontend directory:
   ```
   REACT_APP_API_URL=YOUR_BACKEND_VERCEL_URL/api
   ```

2. Build and deploy the frontend:
   ```
   cd frontend
   npm run build
   vercel login (if not already logged in)
   vercel --prod
   ```

3. Follow the prompts for deployment settings.

## Environment Variables Configuration

Make sure to set these environment variables in your Vercel projects:

### Backend Environment Variables:
- `NODE_ENV`: production
- `PORT`: 5003
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT token generation
- `JWT_EXPIRE`: 30d (30 days token expiration)

### Frontend Environment Variables:
- `REACT_APP_API_URL`: Your backend Vercel URL followed by /api

## Port Configuration

The default port is set to 5003 in the backend code. If you need to use a different port locally:

1. Windows PowerShell:
   ```
   $env:PORT=5003; npm start
   ```

2. Linux/Mac:
   ```
   PORT=5003 npm start
   ```

## CORS Settings

The backend has CORS configured to accept requests from:
- http://localhost:3000
- http://localhost:5173
- https://*.vercel.app

If you need to add more domains, update the `cors` configuration in `backend/src/server.js`.

## Default Admin User

A default admin user is created on first startup:
- Email: syntax@team.com
- Password: 200314

You should change these credentials in production. 