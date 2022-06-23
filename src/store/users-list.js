import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toastActions } from './toast-slice';

const UsersListContext = React.createContext({
  usersList: [],
  setUsersList: () => {},
  isLoading: false,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  setIsLoading: () => {},
  fnHandleError: () => {}
});

export const UserContextProvider = (props) => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fnHandleError = useCallback(
    ({ response }) => {
      dispatch(
        toastActions.showNotification({
          status: 'error',
          title: 'Error',
          message:
            response?.data?.message ||
            response?.statusText ||
            'There is something wrong happended while fetching data'
        })
      );
    },
    [dispatch]
  );

  const addUser = (value) => {
    let currUsersList = [...usersList];
    currUsersList.unshift(value);
    setUsersList(currUsersList);
  };

  const updateUser = (value) => {
    let currUsersList = [...usersList];
    // eslint-disable-next-line eqeqeq
    const userIndx = currUsersList.findIndex(({ id }) => id == value.id);
    if (userIndx > -1) {
      currUsersList.splice(userIndx, 1, value);
      setUsersList(currUsersList);
    }
  };

  const deleteUser = (userId) => {
    let currUsersList = [...usersList];
    // eslint-disable-next-line eqeqeq
    const userIndx = currUsersList.findIndex(({ id }) => id == userId);
    if (userIndx > -1) {
      currUsersList.splice(userIndx, 1);
      setUsersList(currUsersList);
    }
  };

  return (
    <UsersListContext.Provider
      value={{
        usersList,
        setUsersList,
        addUser,
        updateUser,
        deleteUser,
        isLoading,
        setIsLoading,
        fnHandleError
      }}
    >
      {props.children}
    </UsersListContext.Provider>
  );
};

export default UsersListContext;
