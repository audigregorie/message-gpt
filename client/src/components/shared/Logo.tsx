import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex mr-auto items-center gap-2">
      <Link to={'/'} className="flex items-center gap-3">
        <img src="openai.png" alt="openai" className="w-8 h-8 invert" />
        <h1 className="hidden md:block font-extrabold text-xl text-white mr-auto" style={{ textShadow: '2px 2px 20px #00' }}>
          <span className="text-2xl">MessageGPT</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
