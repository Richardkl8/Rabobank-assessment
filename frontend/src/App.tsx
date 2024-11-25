import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StatementsDetails } from '@/pages/StatementsDetails';
import { Statements } from '@/pages/Statements';
import { ROUTES } from '@/configs/constants';

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Error</h1>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Statements />} />
          <Route path={`${ROUTES.STATEMENTS_DETAILS}/:fileId`} element={<StatementsDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
