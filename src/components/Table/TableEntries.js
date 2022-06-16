import React from 'react';

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });

export default function TableEntries({ usersData }) {
  return usersData.map(
    ({ id, image, email, birthDate, phone, firstName, lastName }) => (
      <tr key={id}>
        <th scope="row" className="align-middle">
          {id}
        </th>
        <td className="align-middle" style={{ width: '10rem' }}>
          <img className="rounded-circle w-50" src={image} alt={image} />
        </td>
        <td className="align-middle">
          {dateFormat.format(new Date(birthDate))}
        </td>
        <td className="align-middle">{phone}</td>
        <td className="align-middle">{email}</td>
        <td className="align-middle">{firstName}</td>
        <td className="align-middle">{lastName}</td>
        <td className="align-middle">
          <button>Edit</button>
        </td>
      </tr>
    )
  );
}
