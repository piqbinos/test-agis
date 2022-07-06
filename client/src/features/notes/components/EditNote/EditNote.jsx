import styles from './EditNote.module.css';

import { useState } from 'react';

import { updateNoteFx } from '../../models/notes';

const EditNote = ({ initialText, id, setEditMode }) => {
  const [newText, setNewText] = useState(initialText);

  const changeNewTextHandler = (e) => setNewText(e.target.value);

  const updateNoteHandler = () => {
    if (newText.trim().length === 0) {
      setEditMode(false);
      return;
    }
    updateNoteFx({ id, text: newText });
    setEditMode(false);
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      updateNoteHandler();
    }
  };

  return (
    <div className={styles.container}>
      <input
        value={newText}
        onChange={changeNewTextHandler}
        type="text"
        className={styles.input}
        onBlur={updateNoteHandler}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export { EditNote };
