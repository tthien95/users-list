import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UsersListContext from '../../store/users-list';

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });

const TableEntries = ({ usersData }) => {
  const { deleteUser } = useContext(UsersListContext);

  return usersData.map(
    ({ id, image, email, birthDate, phone, firstName, lastName }) => {
      return (
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
            <div className="d-flex justify-content-between">
              <Link to={`/user/${id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteUser(id)}>Delete</button>
            </div>
          </td>
        </tr>
      );
    }
  );
};

export default TableEntries;
