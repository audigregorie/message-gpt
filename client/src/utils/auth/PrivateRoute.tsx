import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute: React.FC = () => {
  const auth = useAuth();

  return auth?.isLoggedIn && auth?.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
