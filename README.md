# Local Sathi - AI-powered Customer Support

Local Sathi is an AI-powered chatbot solution for small businesses in India, offering multilingual support on WhatsApp and Telegram.

## Project Structure

- `index.html` - Main landing page
- `styles.css` - Styles for the landing page
- `script.js` - JavaScript for the landing page functionality
- `form.html` - Subscription form page
- `form.css` - Styles for the subscription form
- `form.js` - JavaScript for the subscription form functionality
- `admin.html` - Admin dashboard to view customer details and payments
- `images/` - Directory containing all images used in the project

## Required Images

Please add the following images to the `images/` directory:

- `logo.png` - Main logo for Local Sathi
- `payment-qr.png` - QR code for payment
- `paytm-logo.png` - PayTM logo
- `upi-logo.png` - UPI logo
- `googlepay-logo.png` - Google Pay logo
- `phonepe-logo.png` - PhonePe logo
- `en-flag.png` - English flag icon
- `np-flag.png` - Nepali flag icon
- `in-flag.png` - Indian flag icon

## Features

1. **Multilingual Support**: English, Hindi, and Nepali
2. **Price Plans**:
   - Basic: ₹599/month
   - Business: ₹999/month
   - Premium: ₹1499/month
   - Enterprise: ₹2599/month

3. **Payment Processing**: QR code-based UPI payments
4. **Admin Dashboard**: Track customer registrations and payments

## How to Use

1. **Landing Page**: Open `index.html` to view the main website
2. **Subscription**: Click on "Get Started" to access the subscription form
3. **Admin Access**: Access `admin.html` for the administrative dashboard

## Payment Flow

1. User selects a plan on the landing page
2. User fills out personal and business information
3. User scans QR code to make payment
4. User enters transaction details for verification
5. User receives a confirmation with reference number

## Development Setup

This is a static website that can be deployed on any web server. No special setup is required for basic functionality.

For full functionality including payment processing and admin features, you would need to:

1. Connect to a backend service (provided separately)
2. Ensure all necessary images are in place
3. Configure the UPI payment ID in `form.js`

## Contact

For support or questions, please contact syntax@samurai.com.
