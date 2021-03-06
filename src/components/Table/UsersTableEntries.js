import React, { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import UsersListContext from '../../store/users-list';
import { deleteReq } from '../../utils/api-helper';
import { toastActions } from '../../store/toast-slice';

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });

const TableEntries = ({ usersData }) => {
  const { deleteUser, isLoading, setIsLoading, fnHandleError } =
    useContext(UsersListContext);
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (userId) => {
      setIsLoading(true);
      deleteReq(`/users/${userId}`)
        .then(() => {
          dispatch(
            toastActions.showNotification({
              status: 'success',
              title: 'Success',
              message: 'Delete request has been sent successfully'
            })
          );
          deleteUser(userId);
        }, fnHandleError)
        .finally(() => {
          setIsLoading(false);
        });
    },
    [deleteUser, setIsLoading, fnHandleError, dispatch]
  );

  if (usersData.length === 0 || isLoading) {
    return (
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
            <p className="text-center" data-testid="nodata">
              No Data
            </p>
          )}
        </td>
      </tr>
    );
  }

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
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </td>
        </tr>
      );
    }
  );
};

export default TableEntries;
