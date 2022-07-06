import styles from './TextField.module.css';

import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react';

import { $input, change, submit } from '../../models/notes.js';

const TextField = () => {
  const input = useStore($input);

  const inputRef = useRef(null);

  const checkInputValue = (string) => {
    if (string.trim().length > 0) {
      return true;
    }
    return false;
  };

  const inputChangeHandler = (event) => {
    if (checkInputValue(event.currentTarget.value)) {
      change(event.currentTarget.value);
    }
  };

  const saveNoteHandler = () => {
    submit();
  };

  useEffect(() => {
    const listener = (event) => {
      if (
        event.key === 'Enter' &&
        document.activeElement === inputRef.current
      ) {
        saveNoteHandler();
      }
    };

    document.addEventListener('keyup', listener);

    return () => document.removeEventListener('keyup', listener);
  }, []);

  const buttonIsDisabled = !checkInputValue(input);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Создайте новую заметку</h1>
      <input
        className={styles.input}
        ref={inputRef}
        value={input}
        onChange={inputChangeHandler}
        placeholder="Введите текст заметки"
        type="text"
      />
      <button
        type="button"
        className={styles.button}
        onClick={saveNoteHandler}
        disabled={buttonIsDisabled}
      >
        Сохранить
      </button>
    </div>
  );
};

export { TextField };
