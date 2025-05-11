import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/login',
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || 'Login successful');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error(res.data.message || 'Login failed');
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        
        <div className="flex flex-col gap-4">
          <input
            name="email"
            value={user.email}
            onChange={changeHandler}
            type="email"
            placeholder="Enter your email"
            className="p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            value={user.password}
            onChange={changeHandler}
            type="password"
            placeholder="Enter your password"
            className="p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
