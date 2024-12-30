import styles from './btnLogout.module.css';
import { useDispatch } from 'react-redux';
import { LOGOUT } from './../../services/session';

/**
 * button logout
 */
const BtnLogout = () => {
  const dispatch = useDispatch();

  function logout(){
    dispatch(LOGOUT());
  }

  return (
    <div className={styles.logoutButton} onClick={logout}>
        Logout
    </div>
  );
};

export { BtnLogout };