import './App.css';
import Navigation from './components/Navigation/Navigation';
import UsersTable from './components/Table/UsersTable';
import { Routes, Route } from "react-router-dom";
import UserForm from './components/Form/UserForm';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<UsersTable />}/>
        <Route path='new-user' element={<UserForm/>}/>
      </Routes>
    </>
  );
}

export default App;
