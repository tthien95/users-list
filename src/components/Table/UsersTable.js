import React, { useEffect, useState } from 'react';
import { get } from '../../utils/api-helper';
import TableEntries from './TableEntries';

export default function UsersTable() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    get('/users')
      .then((res) => {
        const usersList = res.data.data;

        setUsersList(usersList);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let content = (
    <tr>
      <td colSpan="6" className="text-center">
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
    content = <TableEntries usersData={usersList} />;
  }

  return (
    <div className="container-md">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
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
