import axios from "axios";
import { useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";


const Home = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
   const {toast} = require('sonner');
  
    const addTodoHandler = async () => {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/task/create-task',
          { title, description,taskId},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
  
        if (res.data.success) {
          toast.success(res.data.message);
          console.log(res.data);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.error(error);
      }
    };
  
    return (
      <>
        <Toaster position="top-center" richColors />
        <Navbar />
        <div className="flex flex-col items-center gap-5 mt-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add a new todo title..."
            className="w-1/4 p-2 border border-gray-300 rounded"
          />
  
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for your todo..."
            className="w-1/4 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            placeholder="write task ID here..."
            className="w-1/4 p-2 border border-gray-300 rounded"
          />
  
          <Button onClick={addTodoHandler}>Add Todo</Button>
        </div>
      </>
    );
}

export default Home