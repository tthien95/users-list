import React, { useState, useEffect } from 'react';
import { get } from '../utils/api-helper';

const UsersListContext = React.createContext({
  usersList: [],
  isLoading: false,
  addUser: (value) => {},
  updateUser: (value) => {}
});

export const UserContextProvider = (props) => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get('/users')
      .then((res) => {
        const usersList = res.data.users;
        setUsersList(usersList);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addUser = (value) => {
    let currUsersList = [...usersList];
    currUsersList.unshift(value);
    setUsersList(currUsersList);
  };

  const updateUser = (value) => {
    let currUsersList = [...usersList];
    const userIndx = currUsersList.findIndex(({ id }) => id !== value.id);
    if (userIndx > -1) {
      currUsersList.splice(userIndx, 1, { ...value });
      setUsersList(currUsersList);
    }
  };

  return (
    <UsersListContext.Provider
      value={{ usersList, addUser, updateUser, isLoading }}
    >
      {props.children}
    </UsersListContext.Provider>
  );
};

export default UsersListContext;
