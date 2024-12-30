import React, { useState, useEffect } from 'react';
import styles from './taskList.module.css';
import { Task } from '../task/task';
import { BtnAdd } from '../btnAdd/btnAdd';
import { useSelector } from 'react-redux';

/**
 * generate a list of tasks
 */
const TaskList = () => {
  const token = useSelector((state) => state.session.token);
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const matchesCompleted = showCompleted ? task.completed : true;
        return matchesSearch && matchesCompleted;
      })
    : [];

  const deleteTask = async (_id) => {
    try {
      const response = await fetch(`/api/tasks/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if(response.ok){
        setTasks(tasks.filter(task => task._id !== _id));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const switchCompleteTask = async (_id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          field: 'completed',
          value: !completed
        })
      });

      const data = await response.json();

      if(+data.success){
        setTasks(tasks.map(function (task) {
          if(task._id == _id){
            task.completed = !task.completed;
          }

          return task; 
        }));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
        <div className={styles['main-container']}>
            <BtnAdd tasks={tasks} setTasks={setTasks} />
            <div className={styles['container-box']}>
              <input 
                placeholder='Here you can filter!' 
                className={styles.filter}
                value={search}
                onChange={(event) => {setSearch(event.target.value);}}
                />
              </div>
              <div className={styles['checkbox-completed']}>
                <label>
                  <input type="checkbox"
                    checked={showCompleted} 
                    onChange={(e) => setShowCompleted(e.target.checked)} 
                  /> Completados
                </label>
              </div>
              <div className={styles['task-list-container']}>
                {
                  filteredTasks.map(task => (
                    <Task
                      key={task._id}
                      _id={task._id}
                      title={task.title}
                      description={task.description}
                      completed={task.completed}
                      onDelete={() => deleteTask(task._id)}
                      onSwitch={() => switchCompleteTask(task._id, task.completed)}
                    />
                  ))
                }
              </div>
          </div>
  );
};

export { TaskList };