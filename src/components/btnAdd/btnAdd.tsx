import React, { Dispatch, useState } from 'react';
import styles from '../task/task.module.css';
import { useSelector } from 'react-redux';

interface Task {
  idtask: number;
  title: string;
  description: string;
  completed: boolean;
}

interface BtnAddProps {
  tasks: Task[];
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
}

/**
 * add Task
 */
const BtnAdd: React.FC<BtnAddProps> = ({ tasks, setTasks }) => {
  const token = useSelector((state) => state.session.token);

  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleToggle = () => {
    setIsAdding(!isAdding);
  };

  const handleSave = async () => {
    if(taskTitle){
      const taskData = {
        title: taskTitle,
        description: taskDescription,
      };

      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        });
  
        if (response.ok) {
          setTaskTitle('');
          setTaskDescription('');
          setIsAdding(false);
  
          const data = await response.json();
  
          setTasks(tasks.concat([data.task]));
        } else {
          console.error('Failed to save task:', await response.json());
        }
      } catch (error) {
        console.error('Error during save task:', error);
      }
    }else{
      setIsAdding(false);
    }
  };

  return (
    <div className={styles['button-container']}>
        {isAdding ? (
          <div className={styles['task-list-container']}>
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
              <button className={taskTitle ? styles['btn-save'] :  styles['btn-close']} onClick={handleSave}>
                {taskTitle ? 'Save' : 'Close'}
              </button>
            </div>
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