import { Button } from '@mui/material';
import FormInput from '../components/shared/FormInput';
import { IoIosLogIn } from 'react-icons/io';
import { useAuth } from '../utils/auth/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from './shared/Logo';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Signing Up', { id: 'signup' });
      await auth?.signup(name, email, password);
      toast.success('Signed Up Successfully', { id: 'signup' });
    } catch (error) {
      console.log(error);
      toast.error('Signing Up Failed', { id: 'signup' });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate('/chat');
    }
  }, [auth?.user]);

  return (
    <div className="min-h-screen flex">
      <div className="hidden xl:flex-1 xl:flex xl:justify-center xl:items-center">
        <div className="xl:mt-44 2xl:mt-6">
          <img src="chat.png" alt="chatbot" className="h-[24rem] w-[46rem] 2xl:h-[34rem] 2xl:w-[56rem] rounded-lg shadow-[0px_0px_25px_#64f3d5]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-24">
        <div>
          <Logo hideText={false} />
        </div>

        <div>
          <form onSubmit={handleSubmit} className="m-auto p-10 rounded-xl border-none shadow-[10px_10px_20px_#000] ">
            <div className="flex flex-col justify-center">
              <h4 className="text-center p-2 font-semibold">Sign up for your account</h4>
              <FormInput type="text" name="name" label="Name" />
              <FormInput type="email" name="email" label="Email" />
              <FormInput type="password" name="password" label="Password" />
              <Button type="submit" className="!my-6 !py-3 !rounded-xl !bg-[#00fffc] hover:!bg-white hover:text-black" endIcon={<IoIosLogIn />}>
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
