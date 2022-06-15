import React from 'react';

export default function TableEntries({ usersData }) {
  return usersData.map((user) => (
    <tr key={user.id}>
      <th scope="row" className="align-middle">
        {user.id}
      </th>
      <td className="align-middle">
        <img
          className="rounded-circle w-25"
          src={user.image}
          alt={user.image}
        />
      </td>
      <td className="align-middle">{user.email}</td>
      <td className="align-middle">{user.firstName}</td>
      <td className="align-middle">{user.lastName}</td>
      <td className="align-middle">
        <button>Edit</button>
      </td>
    </tr>
  ));
}
