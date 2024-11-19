import { Button } from '@mui/material';
import FormInput from '../components/shared/FormInput';
import { IoIosLogIn } from 'react-icons/io';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      toast.loading('Signing in...', { id: 'login' });
      await auth?.login(email, password);
      toast.success('Sign in successfull', { id: 'login' });
    } catch (error) {
      console.log(error);
      toast.error('Sign in failed', { id: 'login' });
    }
  };

  return (
    <div className="w-full h-full flex flex-1 px-32">
      <div className="mt-32 md:flex ">
        {/* <img src="chatbot-canva.png" alt="Chatbot" className="w-[35rem] h-[35rem]" /> */}
        <img src="ai-mobile-chat.png" alt="Chatbot" className="w-[55rem] h-[40rem]" />
      </div>

      {/* <div className="flex sm:flex-1 md:flex-[0.5] justify-center items-center p-2 ml-auto mt-16 debug"> */}
      <div className="ml-auto flex mt-auto sm:flex-1 md:flex-[0.5] justify-center items-center">
        <form onSubmit={handleSubmit} className="m-auto p-10 rounded-xl border-none shadow-[10px_10px_20px_#000] ">
          <div className="flex flex-col justify-center">
            <h4 className="text-center p-2 font-semibold">Login to your account</h4>
            <FormInput type="email" name="email" label="Email" />
            <FormInput type="password" name="password" label="Password" />
            <Button type="submit" className="!my-6 !py-3 !rounded-xl !bg-[#00fffc] hover:!bg-white hover:text-black" endIcon={<IoIosLogIn />}>
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
