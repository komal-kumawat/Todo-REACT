import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/todo', { task });
      onTaskAdded(response.data); // Pass the new task to parent
      setTask(''); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <input 
        type='text' 
        placeholder='Enter the task....' 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
