import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { MainLayout } from './layout/MainLayout';
import { DrawerNav } from './components/DrawerNav';
import { Notification } from './components/Notification';
import { LoadingFallback } from './components/LoadingFallback';

const NotesPage = React.lazy(() => import('./pages/NotesPage'));
const GridPage = React.lazy(() => import('./pages/GridPage'));

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <NotesPage />
          </Route>

          <Route path="/grid">
            <GridPage />
          </Route>

          <Redirect to="/"/>
        </Switch>

        <DrawerNav />
        <Notification />
      </MainLayout>
    </Suspense>
  );
}

export default App;
