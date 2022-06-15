import React from 'react';

export default function TableEntries({ usersData }) {
  return usersData.map((user) => (
    <tr key={user.id}>
      <th scope='row'>{user.id}</th>
      <td>
        <img className='rounded' src={user.avatar} alt={user.avatar} />
      </td>
      <td>{user.email}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>
        <button>Edit</button>
      </td>
    </tr>
  ));
}
