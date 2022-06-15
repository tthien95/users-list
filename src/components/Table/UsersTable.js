import React, { useEffect, useState } from 'react';
import { get } from '../../utils/api-helper';
import TableEntries from './TableEntries';

export default function UsersTable() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    get('https://reqres.in/api/users').then((res) => {
      const usersList = res.data.data;

      setUsersList(usersList);
    });
  }, []);

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th >
          <th scope='col'>Avatar</th >
          <th scope='col'>Email</th >
          <th scope='col'>Last Name</th >
          <th scope='col'>First Name</th >
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody>
        {usersList.length === 0 ? (
          <tr>
            <td>
              <p>No Data</p>
            </td>
          </tr>
        ) : (
          <TableEntries usersData={usersList} />
        )}
      </tbody>
    </table>
  );
}
