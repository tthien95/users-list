import { screen, render, cleanup, within } from '@testing-library/react';
import UsersListContext from '../store/users-list';
import UsersTableEntries from '../components/Table/UsersTableEntries';
import { Provider } from 'react-redux';
import store from '../store/index';
import { BrowserRouter } from 'react-router-dom';

const renderWithContext = ({
  setIsLoading = jest.fn(),
  deleteUser = jest.fn(),
  isLoading = false,
  usersList = [],
  fnHandleError = jest.fn()
}) => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <UsersListContext.Provider
          value={{
            isLoading,
            deleteUser,
            setIsLoading,
            fnHandleError
          }}
        >
          <table>
            <tbody>
              <UsersTableEntries usersData={usersList} />
            </tbody>
          </table>
        </UsersListContext.Provider>
      </Provider>
    </BrowserRouter>
  );
};

describe('UsersTableEntries', () => {
  afterAll(cleanup);

  it('should show spinner when loading status is true', () => {
    renderWithContext({ isLoading: true });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should show message when there is no data', () => {
    renderWithContext({ isLoading: false, usersList: [] });

    expect(screen.getByTestId('nodata')).toBeInTheDocument();
  });

  it('should show users data', () => {
    const usersList = [
      {
        id: 1,
        firstName: 'Terry',
        lastName: 'Medhurst',
        birthDate: '2000-12-25',
        email: 'atuny0@sohu.com',
        phone: '+63 791 675 8914'
      },
      {
        id: 2,
        firstName: 'Sheldon',
        lastName: 'Quigley',
        birthDate: '2003-08-02',
        email: 'hbingley1@plala.or.jp',
        phone: '+07 813 117 7139'
      }
    ];

    renderWithContext({ isLoading: false, usersList });

    const allRows = screen.getAllByRole('row');
    expect(allRows).toHaveLength(2);

    const firstRow = allRows[0];
    expect(within(firstRow).getByRole('rowheader')).toBeInTheDocument();
    expect(within(firstRow).getAllByRole('cell')).toHaveLength(7);
  });
});
