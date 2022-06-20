import './App.css';
import Navigation from './components/Navigation/Navigation';
import UsersTable from './components/Table/UsersTable';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/Form/UserForm';
import { UserContextProvider } from './store/users-list';

function App() {
  return (
    <>
      <Navigation />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<UsersTable />} exact />
          <Route path="new-user" element={<UserForm />} exact />
          <Route path="user/:userId" element={<UserForm />} exact />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
