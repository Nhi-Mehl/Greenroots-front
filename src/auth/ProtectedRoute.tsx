// This component will be used to protect routes that require authentication.
// If the user is not authenticated, they will be redirected to the login page.
import { Navigate, useLocation } from 'react-router-dom';
import { useGetProfileQuery } from '../store/features/user/userApiSlice';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useGetProfileQuery();

  // wait for data before deciding
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  // Redirect to /login if not authenticated or API error
  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Display the content if the user is authenticated
  return children;
};

export default ProtectedRoute;
