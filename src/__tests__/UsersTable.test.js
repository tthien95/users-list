import { render, screen, cleanup, waitFor } from '@testing-library/react';
import UsersTable from '../components/Table/UsersTable';
import { Provider } from 'react-redux';
import UsersListContext from '../store/users-list';
import store from '../store/index';
import axios from 'axios';

jest.mock('axios');

const sampleUsers = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    birthDate: '2000-12-25',
    email: 'atuny0@sohu.com',
    phone: '+63 791 675 8914'
  }
];

const renderWithContext = ({
  setIsLoading = () => {},
  setUsersList = () => {},
  fnHandleError = () => {}
} = {}) => {
  return render(
    <Provider store={store}>
      <UsersListContext.Provider
        value={{
          setUsersList,
          usersList: [],
          setIsLoading,
          fnHandleError
        }}
      >
        <UsersTable />
      </UsersListContext.Provider>
    </Provider>
  );
};

describe('UsersTable', () => {
  beforeEach (() => {
    axios.get.mockResolvedValue({
      data: {
        users: []
      }
    });
  });

  afterAll(cleanup);

  it('should render table with columns', () => {
    renderWithContext();

    expect(screen.getAllByRole('columnheader')).toHaveLength(8);
  });

  it('should run its side effect', async () => {
    const setIsLoading = jest.fn();
    const setUsersList = jest.fn();

    axios.get.mockResolvedValueOnce({
      data: {
        users: [...sampleUsers]
      }
    });

    renderWithContext({ setIsLoading, setUsersList });

    await waitFor(() => expect(setIsLoading).toHaveBeenCalledTimes(2));

    expect(setUsersList).toBeCalledTimes(1);
    expect(setUsersList).toBeCalledWith(sampleUsers);

    expect(setIsLoading.mock.calls[0][0]).toBeTruthy();
    expect(setIsLoading.mock.calls[1][0]).toBeFalsy();
  });

});
