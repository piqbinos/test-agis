import styles from './Layout.module.css';

import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

import noteImg from '@assets/note.png';

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <h1 className={styles.logo__text}>Заметки</h1>
            <img className={styles.logo__img} src={noteImg} alt="Notes" />
          </div>
        </Link>
      </header>
      <nav>
        <ul className={styles.list__container}>
          <li className={styles.list__item}>
            <NavLink
              className={({ isActive }) =>
                clsx(styles.nav__link, { [styles.active]: isActive })
              }
              to="/"
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink
              className={({ isActive }) =>
                clsx(styles.nav__link, { [styles.active]: isActive })
              }
              to="/notes"
            >
              Заметки
            </NavLink>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export { Layout };
