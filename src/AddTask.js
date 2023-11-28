import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
const AddTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      alert('Task name is required.');
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      name: taskName,
      description: taskDescription,
      priority,
      completed: false,
    };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...storedTasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate('/');
  };

  return (
    <div className='container'>
      <h2>Add Task</h2>
      <label>
        Task Name:
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </label>
      <label>
        Task Description:
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </label>
      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
