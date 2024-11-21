import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './shared/Logo';

const Header = () => {
  const { isLoggedIn } = useAuth();

  const handleLogout = async () => {
    console.log('Navigate to logout ');
  };

  const handleSignup = () => {
    console.log('Navigate to signup or trigger signup process');
  };

  return (
    <header className="bg-transparent shadow-none static px-4 py-2">
      <div className="flex items-center justify-between">
        <Logo />
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/chat" className="nav-link bg-[#00fffc] text-black">
                Go To Chat
              </Link>
              <button onClick={handleLogout} className="nav-link bg-[#51538f] text-white px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link bg-[#00fffc] text-black">
                Login
              </Link>
              <button onClick={handleSignup} className="nav-link bg-[#51538f] text-white px-4 py-2 rounded">
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
