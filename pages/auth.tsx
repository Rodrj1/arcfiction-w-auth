import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { AuthInput } from '../components';
import { SvgGithub, SvgGoogle } from '../components/Svgs';
import axios from 'axios';

export default function Auth() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState<'Register' | 'Sign In'>('Register');

  const handleStatus = () => {
    const updateStatus = status == 'Register' ? 'Sign In' : 'Register';
    setStatus(updateStatus);
  };

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
    } catch (e) {
      console.log(e);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-zinc-950 to-zinc-900 relative h-[80vh]">
      <div className="bg-customgray border-b-8 border-red-600 w-11/12 md:w-[400px] h-auto py-3 rounded-md">
        <h2 className="text-center font-bold text-xl">
          {status === 'Sign In' ? 'Sign In' : 'Register'}
        </h2>

        <div className="flex flex-col gap-10 p-3 justify-center items-center">
          {status == 'Register' && (
            <AuthInput
              id="name"
              type="text"
              label="Username"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          )}

          <AuthInput
            id="email"
            type="email"
            label="Email or phone number"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <AuthInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <button
            onClick={status == 'Register' ? register : login}
            className="bg-red-600 hover:bg-red-600/70 transition-colors text-white w-36 h-12 rounded-md"
          >
            {status == 'Register' ? 'Sign Up' : 'Login'}
          </button>

          <p className="text-neutral-500">
            {status === 'Sign In' ? 'First timer?' : 'Already have an account?'}
            <span
              onClick={handleStatus}
              className="text-blue-600 ml-1 hover:underline cursor-pointer"
            >
              {status === 'Sign In' ? 'Create an account' : 'Login'}
            </span>
          </p>

          <div className="flex gap-5">
            <div className='cursor-pointer' onClick={() => signIn('github', { callbackUrl: '/' })}>
              <SvgGithub />
            </div>
            <div className='cursor-pointer' onClick={() => signIn('google', { callbackUrl: '/' })}>
              <SvgGoogle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
