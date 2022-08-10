import './App.css';
import Navigation from './components/Navigation/Navigation';
import UsersTable from './components/Table/UsersTable';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/Form/UserForm';
import { UserContextProvider } from './store/users-list';
import Toast from './components/Toast/Toast';

const App = () => {
  return (
    <>
      <Toast />
      <Navigation />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="new-user" element={<UserForm />} />
          <Route path="user/:userId" element={<UserForm />} />
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
