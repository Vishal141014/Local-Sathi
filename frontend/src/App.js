import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './utils/axios'; // Import axios configuration

// Pages
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import SubscriptionForm from './pages/SubscriptionForm';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PaymentPage from './pages/PaymentPage';
import TransactionVerificationPage from './pages/TransactionVerificationPage';
import SubscriptionConfirmationPage from './pages/SubscriptionConfirmationPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Demo from './pages/Demo';

// Protected Route Components
const AdminRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  
  const user = JSON.parse(userInfo);
  if (user.role !== 'admin') {
    return <Navigate to="/user-dashboard" />;
  }
  
  return children;
};

const UserRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/demo" element={<Demo />} />
        
        {/* Protected User Routes */}
        <Route 
          path="/user-dashboard" 
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          } 
        />
        <Route 
          path="/subscribe" 
          element={
            <UserRoute>
              <SubscriptionForm />
            </UserRoute>
          } 
        />
        <Route 
          path="/payment" 
          element={
            <UserRoute>
              <PaymentPage />
            </UserRoute>
          } 
        />
        <Route 
          path="/verify-transaction" 
          element={
            <UserRoute>
              <TransactionVerificationPage />
            </UserRoute>
          } 
        />
        <Route 
          path="/subscription-confirmed" 
          element={
            <UserRoute>
              <SubscriptionConfirmationPage />
            </UserRoute>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin-dashboard/*" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        
        {/* Redirect old dashboard paths */}
        <Route path="/dashboard" element={<Navigate to="/user-dashboard" />} />
        <Route path="/admin" element={<Navigate to="/admin-dashboard" />} />
        
        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App; 