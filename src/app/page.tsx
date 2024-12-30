'use client';

import styles from './page.module.css'
import { Provider } from 'react-redux';
import store from '../services/store';
import Content from './content';


/**
 * main store initialization
 */
export default function Home() {
  return(
    <Provider store={store} >
      <main className={styles.main}>
        <Content />
      </main>
    </Provider>
  )
}