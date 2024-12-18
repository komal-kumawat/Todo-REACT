import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import TodoForm from './component/TodoForm'
import TodoList from './component/TodoList';
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);

  };

  return (
    <>
      <h1>Todo App</h1>
      <TodoForm onTaskAdded={handleTaskAdded} />
      <TodoList tasks={tasks} />

    </>
  )
}

export default App
