import React, { useContext, useEffect } from 'react';
import UsersTableEntries from './UsersTableEntries';
import UsersListContext from '../../store/users-list';
import { get } from '../../utils/api-helper';

let isInitialLoad = true;

const UsersTable = () => {
  const { setIsLoading, usersList, setUsersList, fnHandleError } =
    useContext(UsersListContext);

  useEffect(() => {
    if (isInitialLoad) {
      setIsLoading(true);
      get('/users')
        .then((res) => {
          const usersList = res.data.users;
          setUsersList(usersList);
          isInitialLoad = false;
        }, fnHandleError)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fnHandleError, setUsersList, setIsLoading]);

  return (
    <div className="container-md mt-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
            <th scope="col">Birth Date</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Last Name</th>
            <th scope="col">First Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <UsersTableEntries usersData={usersList} />
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
