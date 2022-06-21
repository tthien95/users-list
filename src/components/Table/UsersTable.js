import React, { useContext } from 'react';
import UsersTableEntries from './UsersTableEntries';
import UsersListContext from '../../store/users-list';

export default function UsersTable() {
  const { isLoading, usersList } = useContext(UsersListContext);

  let content = (
    <tr>
      <td colSpan="8" className="text-center">
        {isLoading ? (
          <div
            className="spinner-border"
            style={{ textAlign: 'center' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <p className="text-center">No Data</p>
        )}
      </td>
    </tr>
  );

  if (usersList.length > 0) {
    content = <UsersTableEntries usersData={usersList} />;
  }

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
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
