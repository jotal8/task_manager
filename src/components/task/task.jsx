import React from 'react';
import styles from './task.module.css';

/**
 * generate view Task
 */
const Task = ({ title, description, completed, onDelete, onSwitch }) => {
  return (
    <div className={styles['task-card']}>
      <div className={styles['task-title']}>{title}</div>
      <div className={styles['task-description']}>{description}</div>
      <div className={styles['task_completed']}>
        <label>
          <input type="checkbox" defaultChecked={completed} onClick={onSwitch} /> Completado
        </label>
      </div>
      
      {}
      <button className={styles['btn-delete']} 
        onClick={onDelete}
        title="Delete task"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export { Task };