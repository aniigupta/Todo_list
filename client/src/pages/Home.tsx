import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [taskId, setTaskId] = useState('');
  const [todos, setTodos] = useState<any[]>([]);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/task/create-task',
        { title, task, taskId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setTitle('');
        setTask('');
        setTaskId('');
        fetchTodos(); 
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to add todo');
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/task/getallTasks', {
        withCredentials: true,
      });
      console.log("Tasks response:", res.data);

      if (res.data.success && Array.isArray(res.data.tasks)) {
        setTodos(res.data.tasks);
      } else {
        toast.error(res.data.message || 'No tasks found');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-4 mt-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new todo title..."
          className="w-1/3 p-2 border border-gray-300 rounded"
        />
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a description for your todo..."
          className="w-1/3 p-2 border border-gray-300 rounded"
        />
        <input
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Write task ID here..."
          className="w-1/3 p-2 border border-gray-300 rounded"
        />
        <Button onClick={addTodoHandler}>Add Todo</Button>

        <div className="w-1/2 mt-6 space-y-4">
          {todos.length > 0 ? (
            todos.map((task) => (
              <Card key={task._id}>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="text-gray-600">{task.task}</p>
                  <p className="text-sm text-gray-400">Task ID: {task.taskId}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
