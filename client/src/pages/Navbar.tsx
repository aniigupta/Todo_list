import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import axios from "axios";
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/logout", {}, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success(res.data.message || 'Logout successful');
        setTimeout(() => {
          navigate("http://localhost:5173/login");
        }, 1500); 
      } else {
        toast.error(res.data.message || 'Logout failed');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Logout failed');
      console.error(error);
    }
  };
  

  return (
    <div className="flex items-center justify-between p-2">
      <h1 className="text-xl font-semibold">Todo APP</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Navbar;
