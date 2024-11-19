import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './shared/Logo';

const Header = () => {
  const auth = useAuth();

  return (
    <header className="bg-transparent shadow-none static px-4 py-2">
      <div className="flex items-center justify-between">
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Link to={'/chat'} className="nav-link bg-[#00fffc] text-black">
                Go To Chat
              </Link>
              <Link to={'/'} onClick={() => auth?.logout} className="nav-link bg-[#51538f]">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to={'/login'} className="nav-link bg-[#00fffc] text-black">
                Login
              </Link>
              <Link to={'/signup'} onClick={() => auth?.signup} className="nav-link bg-[#51538f]">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
