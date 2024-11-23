import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <button onClick={navigateHome} className="px-6 py-3 bg-[#64f3d5] text-black rounded-md text-lg font-medium transition-all">
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
