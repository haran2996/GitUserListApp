import { FC } from 'react';
import './style.css';
import { UserListPage } from './UserListPage';
import { Provider } from 'react-redux';
import { store } from './store';
export const App: FC = () => {
  return (
    <Provider store={store}>
      <UserListPage/>
    </Provider>
  );
};
