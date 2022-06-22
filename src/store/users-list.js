import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get } from '../utils/api-helper';
import { toastActions } from './toast-slice';

const UsersListContext = React.createContext({
  usersList: [],
  isLoading: false,
  addUser: (value) => {},
  updateUser: (value) => {}
});

export const UserContextProvider = (props) => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const fnHandleError = ({ response }) => {
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
    };

    get('/users')
      .then((res) => {
        const usersList = res.data.users;
        setUsersList(usersList);
      }, fnHandleError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

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
