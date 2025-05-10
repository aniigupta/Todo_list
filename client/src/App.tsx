import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'sonner';

import Login from './pages/Login';
import Home from './pages/Home'; 

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
