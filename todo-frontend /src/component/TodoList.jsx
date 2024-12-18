import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todo/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.log("Error deleting the task:", err);
        }
    };

    const handleComplete = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/todo/${id}`, { completed: true });
            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        } catch (error) {
            console.log("Error marking task complete:", error);
        }
    };

    return (
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <span>{task.task}</span>
                    <button onClick={() => handleComplete(task.id)}>Complete</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
