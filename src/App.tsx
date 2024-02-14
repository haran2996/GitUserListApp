import { FC } from 'react';
import './style.css';
import { UserListPage } from './pages/UserListPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NoRoute } from './components/NoRoute/NoRoute';
import { UserDetailsPage } from './pages/UserDetailsPage';
export const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' Component={UserListPage} />
          <Route path='/:id' Component={UserDetailsPage} />
          <Route path='*' Component={NoRoute} />
        </Routes>
      </Router>
    </Provider>
  );
};
