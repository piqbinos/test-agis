import { createStore, createEvent, sample, createEffect } from 'effector';

import { API_URL } from '@constants/api';

export const insert = createEvent();
export const remove = createEvent();
export const change = createEvent();
export const reset = createEvent();
export const submit = createEvent();

export const getNotesFx = createEffect(async () => {
  const req = await fetch(API_URL + '/all');
  return req.json();
});

export const createNoteFx = createEffect(async (text) => {
  const req = await fetch(API_URL + '/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  return req.json();
});

export const updateNoteFx = createEffect(async (updateNote) => {
  const req = await fetch(API_URL + '/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateNote),
  });
  return req.json();
});

export const deleteNoteFx = createEffect(async (id) => {
  await fetch(API_URL + `/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return id;
});

export const $input = createStore('')
  .on(change, (_, value) => value)
  .reset(reset, createNoteFx);

export const $notes = createStore([])
  .on(getNotesFx.doneData, (_, notes) => notes)
  .on(createNoteFx.doneData, (notes, note) => [...notes, note])
  .on(updateNoteFx.doneData, (notes, note) => {
    const index = notes.findIndex((n) => n.id === note.id);
    notes[index] = note;
    return [...notes];
  })
  .on(deleteNoteFx.doneData, (notes, id) => {
    return notes.filter((n) => n.id !== id);
  });

sample({
  clock: submit,
  source: $input,
  target: createNoteFx,
});
