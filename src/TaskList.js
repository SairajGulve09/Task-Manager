import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from LocalStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Handle task completion
  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Handle task deletion
  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    
    <div className='container'>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task.id)}
            />
            
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <Link to={`/edit/${task.id}`}>Edit</Link>
           
          </li>
        ))}
      </ul>
      
      <Link to="/add">Add Task</Link>
    </div>
  );
};

export default TaskList;
