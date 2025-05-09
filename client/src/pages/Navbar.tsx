import React from 'react'; 
import { Button } from '../components/ui/button'; 

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <h1 className="text-xl font-semibold">Todo APP</h1>
      <Button>Logout</Button>
    </div>
  );
};

export default Navbar;
