import { Component } from 'react';
import { Link } from 'react-router-dom';

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });

class TableEntries extends Component {
  render() {
    const { usersData } = this.props;

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
              <Link to={`/user/${id}`}>
                <button>Edit</button>
              </Link>
            </td>
          </tr>
        );
      }
    );
  }
}

export default TableEntries;
