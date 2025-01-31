// This component will be used to protect routes that require authentication.
// If the user is not authenticated, they will be redirected to the login page.
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/features/auth/authSlice';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);

  // Redirect to /login if not authenticated or API error
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Display the content if the user is authenticated
  return children;
};

export default ProtectedRoute;
