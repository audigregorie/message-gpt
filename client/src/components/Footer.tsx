import { Link } from 'react-router-dom';
import { GITHUB_PROFILE } from '../utils/constants';

const Footer = () => {
  return (
    <footer className=" flex justify-center items-center min-h-[10vh] max-h-[20vh] mt-52">
      <p className="flex items-center gap-4">
        Passion for coding 🐙
        <span>2024</span>
        <Link to={GITHUB_PROFILE} className="nav-link !mx-0 !px-0">
          Audi
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
