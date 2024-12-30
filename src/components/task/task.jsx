import React, { useState } from 'react';
import styles from './task.module.css';

/**
 * generate view Task
 */
const Task = () => {
  return (
    <div className={styles['task-card']}>
        <div className={styles['task-title']}>Este es el título</div>
        <div className={styles['task-description']}>Aquí va la descripción este es un texto más largo ...</div>
        <div className={styles['task_completed']}>
            <label>
                <input type="checkbox" /> Completado
            </label>
        </div>
    </div>
  );
};

export { Task };