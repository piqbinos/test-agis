import { useStore } from 'effector-react';

import { Layout } from '@components/Layout/Layout';
import { TextField } from '../components/TextField/TextField';
import { Note } from '../components/Note';

import { $notes, getNotesFx } from '../models/notes';
import { useEffect } from 'react';

const NotesRoute = () => {
  const notes = useStore($notes);

  useEffect(() => {
    getNotesFx();
  }, []);

  return (
    <Layout>
      <TextField />
      {notes.map(({ id, text }) => (
        <Note key={id} id={id} text={text} />
      ))}
    </Layout>
  );
};

export { NotesRoute };
