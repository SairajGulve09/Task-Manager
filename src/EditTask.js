import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: '',
    description: '',
    priority: 'low',
    completed: false,
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const selectedTask = storedTasks.find((t) => t.id === parseInt(id, 10)) || {
      name: '',
      description: '',
      priority: 'low',
      completed: false,
    };
    setTask(selectedTask);
  }, [id]);

  const handleEditTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map((t) =>
      t.id === parseInt(id, 10) ? { ...task } : t
    );

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate('/');
  };

  return (
    <div className='container'>
      <h2>Edit Task</h2>
      <label>
        Task Name:
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </label>
      <label>
        Task Description:
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </label>
      <label>
        Priority:
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button onClick={handleEditTask}>Save Changes</button>
    </div>
  );
};

export default EditTask;
