import React, { useState } from 'react';
import styles from '../task/task.module.css';

/**
 * add Task
 */
const BtnAdd = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleToggle = () => {
    setIsAdding(!isAdding);
  };

  const handleSave = async () => {
    const taskData = {
      title: taskTitle,
      description: taskDescription,
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log('Task saved successfully');
        setTaskTitle('');
        setTaskDescription('');
        setIsAdding(false);
      } else {
        console.error('Failed to save task:', await response.json());
      }
    } catch (error) {
      console.error('Error during save task:', error);
    }
  };

  return (
    <div className={styles['btn-container']}>
        {isAdding ? (
          <div className={`${styles['task-card']} ${styles['task-card-btn']}`}>
            <input
              type="text"
              className={styles['task-title']}
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              className={styles['task-description']}
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <button className={styles['btn-save']} onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <button className={styles['btn-add']} onClick={handleToggle}>
            Add Task
          </button>
        )}
    </div>
  );
};

export { BtnAdd };