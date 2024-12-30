'use client';

import styles from './page.module.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FormLogin } from '../components/formLogin/formLogin';
import { TaskList } from '../components/taskList/taskList';
import { BtnLogout } from '../components/btnLogout/btnLogout';

/**
 * main Container
 */
export default function Content() {
  const [isClient, setIsClient] = useState(false);
  const stateSession = useSelector((state) => state.session.stateSession);
  const name = useSelector((state) => state.session.name);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if(stateSession == 1){
      return (
        <div> 
          <div className={styles.head}>
             <div className={styles.description}>
                  {name}
              </div>
          </div>
          <div className={styles.containerApp}>
            <TaskList />
            <BtnLogout />
          </div>
        </div>
      )
  }else{
    return (
        <div>
          <div className={styles.description}>
            Welcome to Task Manager
          </div>
          <FormLogin />
        </div>
    )
  }
}