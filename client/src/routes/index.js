import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './publicRoutes';

export const AppRoutes = () => {
  const element = useRoutes(publicRoutes);

  return <>{element}</>;
};
