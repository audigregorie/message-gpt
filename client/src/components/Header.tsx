import { Link, useNavigate } from 'react-router-dom';
import Logo from './shared/Logo';
import { useAuth } from '../utils/auth/AuthContext';

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    await auth?.logout();
    navigate('/');
  };

  return (
    <header className="bg-transparent shadow-none static px-4 py-2">
      <div className="flex items-center justify-between">
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Link to="/chat" className="nav-link bg-mgptTeal text-black">
                Go To Chat
              </Link>
              <button onClick={handleLogout} className="nav-link bg-mgptViolet text-white px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link bg-mgptTeal text-black">
                Login
              </Link>
              <button onClick={handleSignup} className="nav-link bg-mgptViolet text-white px-4 py-2 rounded">
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
