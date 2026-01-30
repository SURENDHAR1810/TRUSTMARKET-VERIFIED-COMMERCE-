import React from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from './constants';
import { useAuth } from './context/AuthContext';

// Components
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import ProductDetailView from './components/ProductDetailView';
import CheckoutView from './components/CheckoutView';
import SellerDashboard from './components/SellerDashboard';
import UserProfile from './components/UserProfile';
import CustomerCareView from './components/CustomerCareView';
import Unauthorized from './pages/Unauthorized';

// Wrappers to handle params
const ProductDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) return <Navigate to="/" replace />;

  return (
    <ProductDetailView
      product={product}
      isLoggedIn={isAuthenticated}
      onBack={() => navigate('/')}
      onCheckout={() => navigate(`/checkout/${product.id}`)}
      onLoginRequired={() => navigate('/login', { state: { from: { pathname: `/product/${product.id}` } } })}
      onNavigateToSupport={() => navigate('/support')}
    />
  );
};

const CheckoutWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) return <Navigate to="/" replace />;

  return (
    <CheckoutView
      product={product}
      onBack={() => navigate(`/product/${product.id}`)}
      onSuccess={() => {
        // Simple success handling - navigate home
        navigate('/');
      }}
      onNavigateToSupport={() => navigate('/support')}
    />
  );
};

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Simple splash screen management - could be improved but keeping minimal
  // For now, we go straight to Home. Original app had splash logic in state.
  // We can treat default route as Home.

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/product/:id" element={<ProductDetailWrapper />} />

      <Route path="/checkout/:id" element={
        <ProtectedRoute>
          <CheckoutWrapper />
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <RoleBasedRoute allowedRoles={['seller', 'admin']}>
          <SellerDashboard onBack={async () => {
            await logout();
            navigate('/login');
          }} />
        </RoleBasedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile
            onBack={() => navigate('/')}
            onNavigateToSupport={() => navigate('/support')}
            onProductSelect={(product) => navigate(`/product/${product.id}`)}
          />
        </ProtectedRoute>
      } />

      <Route path="/support" element={<CustomerCareView onBack={() => navigate('/')} />} />

      {/* Unauthorized access page */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;