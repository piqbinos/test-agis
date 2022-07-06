import styles from './Note.module.css';

import { useState } from 'react';
import clsx from 'clsx';

import { EditNote } from '../EditNote/EditNote';
import { deleteNoteFx } from '../../models/notes';

import editImg from '@assets/edit.png';
import deleteImg from '@assets/delete.png';

const Note = ({ text, id }) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode((currentValue) => !currentValue);

  return (
    <li className={styles.container}>
      <button
        className={clsx(styles.button, styles.edit)}
        onClick={toggleEditMode}
      >
        <img
          className={clsx(styles.img, styles.edit)}
          src={editImg}
          alt="Edit note"
        />
      </button>
      <button
        className={clsx(styles.button, styles.remove)}
        onClick={() => deleteNoteFx(id)}
      >
        <img
          className={clsx(styles.img, styles.remove)}
          src={deleteImg}
          alt="Delete note"
        />
      </button>
      {editMode ? (
        <EditNote id={id} setEditMode={setEditMode} initialText={text} />
      ) : (
        <p>{text}</p>
      )}
    </li>
  );
};

export { Note };
