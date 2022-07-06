import styles from './Welcome.module.css';

import handWaveImg from '@assets/hand-wave.png';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img className={styles.title__img} src={handWaveImg} alt="Hand wave" />
        <h1 className={styles.title__text}>Добро пожаловать!</h1>
      </div>
      <p className={styles.text}>Это хранилище ваших заметок</p>
      <Link to="/notes" className={styles.link}>
        Перейти на страницу с заметками
      </Link>
    </div>
  );
};

export { Welcome };
