import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';


const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

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
      } else {
        toast.error(res.data.message || 'Login failed');
      }

    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <input
        name="email"
        value={user.email}
        onChange={changeHandler}
        type="text"
        placeholder="Email"
        className="p-2 border rounded w-1/3"
      />
      <input
        name="password"
        value={user.password}
        onChange={changeHandler}
        type="password"
        placeholder="Password"
        className="p-2 border rounded w-1/3"
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
