import React, { useState } from 'react';
import styles from './task.module.css';
import { useSelector } from 'react-redux';


/**
 * generate view Task
 */
const Task = ({ _id, title, description, completed, onDelete, onSwitch }) => {
  const token = useSelector((state) => state.session.token);
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);

  const handleTitleDoubleClick = () => setIsEditingTitle(true);
  const handleDescriptionDoubleClick = () => setIsEditingDescription(true);

  const handleTitleChange = (e) => setEditableTitle(e.target.value);
  const handleDescriptionChange = (e) => setEditableDescription(e.target.value);

  const updateTask = async (field, value) => {
    try {
      const response = await fetch(`/api/tasks/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          field,
          value
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Error updating task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTitleBlurOrEnter = async (e) => {
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      setIsEditingTitle(false);
      if (editableTitle !== title) {
        await updateTask('title', editableTitle);
      }
    }
  };

  const handleDescriptionBlurOrEnter = async (e) => {
    if (e.type === 'blur' || (e.type === 'keydown' && e.key === 'Enter')) {
      setIsEditingDescription(false);
      if (editableDescription !== description) {
        await updateTask('description', editableDescription);
      }
    }
  };

  return (
    <div className={styles['task-card']}>

      <div className={styles['task-title']}>
        {isEditingTitle ? (
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlurOrEnter}
            onKeyDown={handleTitleBlurOrEnter}
            autoFocus
          />
        ) : (
          <span onDoubleClick={handleTitleDoubleClick}>{editableTitle}</span>
        )}
      </div>

      <div className={styles['task-description']}>
        {isEditingDescription ? (
          <input
            type="text"
            value={editableDescription}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlurOrEnter}
            onKeyDown={handleDescriptionBlurOrEnter}
            autoFocus
          />
        ) : (
          <span onDoubleClick={handleDescriptionDoubleClick}>{editableDescription}</span>
        )}
      </div>

      <div className={styles['task_completed']}>
        <label>
          <input type="checkbox" defaultChecked={completed} onClick={onSwitch} /> Completado
        </label>
      </div>

      <button
        className={styles['btn-delete']}
        onClick={onDelete}
        title="Delete task"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export { Task };