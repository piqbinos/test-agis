import { WelcomeRoute } from '@features/welcome';
import { NotesRoute } from '@features/notes';

export const publicRoutes = [
  {
    path: '/',
    element: <WelcomeRoute />,
  },
  {
    path: '/notes',
    element: <NotesRoute />,
  },
];
