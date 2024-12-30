import React, { useState } from 'react';
import styles from './taskList.module.css';
import { Task } from '../task/task';
import { BtnAdd } from '../btnAdd/btnAdd';


/**
 * generate a list of tasks
 */
const TaskList = () => {
  const [search, setSearch] = useState();

  return (
        <div>
            <BtnAdd />
            <div className={styles['container-box']}>
              <input 
                placeholder='Here you can filter!' 
                className={styles.filter}
                value={search} 
                onChange={(event) => {setSearch(event.target.value);}}
                />
              </div>
              <div className={styles['container-box']}>
                <Task />
              </div>
          </div>
  );
};

export { TaskList };