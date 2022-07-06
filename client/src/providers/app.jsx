import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@routes/index';

const AppProvider = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export { AppProvider };
