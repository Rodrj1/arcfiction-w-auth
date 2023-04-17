import { useCallback, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { AuthInput } from '../components';
import { SvgGithub, SvgGoogle } from '../components/Svgs';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Auth() {
  const router = useRouter();

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
      toast.loading('Sending request');
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
      router.push('/');
      toast.success('Succesfully logged in!');
    } catch (e) {
      console.log(e);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      toast.loading('Checking if valid...');
      await axios.post('/api/register', {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      toast.error('Email taken!', {
        duration: 2300,
      });
    }
  }, [email, name, password, login]);

  const loginWithProvider = async (provider: string) => {
    toast.loading('Sending request');
    await signIn(`${provider}`, { callbackUrl: '/' });
    toast.success('Redirecting');
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-zinc-950 to-zinc-900 relative h-auto">
      <div className="flex flex-col bg-customgray w-11/12 md:w-[400px] h-auto py-3 rounded-md p-3 mb-5 mt-20 text-sm">
        <p>
          <span className="text-red-500 font-bold">ALTERNATIVELY</span> if you
          do not want to register:
        </p>
        <Link className="text-blue-600 hover:underline" href={'/movies'}>
          Movies
        </Link>
        <Link className="text-blue-600 hover:underline" href={'/tvshows'}>
          TV Shows
        </Link>
        <p>
          By allowing these pages to non-registered users (for testing
          purposes), those that did register might experience the loss of logged
          status when refreshing pages with F5. Redirect to /auth to log again.
        </p>
      </div>
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
            <div
              className="cursor-pointer"
              onClick={() => loginWithProvider('github')}
            >
              <SvgGithub />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => loginWithProvider('google')}
            >
              <SvgGoogle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
