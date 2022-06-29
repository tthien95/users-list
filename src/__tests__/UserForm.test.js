import {
  cleanup,
  render,
  waitForElementToBeRemoved,
  within,
  screen,
  waitFor
} from '@testing-library/react';
import UserForm from '../components/Form/UserForm';

import { useSelector, useDispatch, Provider } from 'react-redux';
import store from '../store/index';
import { act, Simulate } from 'react-dom/test-utils';
import { toastActions } from '../store/toast-slice';
import { post, put, get } from '../utils/api-helper';
import { useNavigate, useParams } from 'react-router-dom';
import UsersListContext from '../store/users-list';
import { useForm } from '../hooks/use-form';

const sampleUser = {
  id: 1,
  firstName: 'Terry',
  lastName: 'Medhurst',
  birthDate: '2000-12-25',
  email: 'atuny0@sohu.com',
  phone: '+63 791 675 8914'
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('../utils/api-helper');

const wrapperRender = ({
  updateUser = () => {},
  addUser = () => {},
  fnHandleError = () => {}
} = {}) => {
  return render(
    <Provider store={store}>
      <UsersListContext.Provider value={{ updateUser, addUser, fnHandleError }}>
        <UserForm />
      </UsersListContext.Provider>
    </Provider>
  );
};

describe('UserForm', () => {
  afterAll(cleanup);

  beforeEach(() => {
    useDispatch.mockReturnValue(() => {});
    useNavigate.mockReturnValue(() => {});
    useSelector.mockReturnValue(() => {});
  });

  it('should display empty form for new user', () => {
    useParams.mockReturnValue({ userId: null });

    const { container } = wrapperRender();

    expect(container).toMatchSnapshot();
  });

  it('should display form with user information for edit', async () => {
    useParams.mockReturnValue({ userId: '1' });
    get.mockResolvedValue({
      data: { ...sampleUser }
    });

    const { container } = wrapperRender();
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    expect(get).toBeCalled();
    expect(get).toBeCalledWith(`/users/${sampleUser.id}`);

    expect(container).toMatchSnapshot();
  });

  it('should submit add user form with correct inputs', async () => {
    const testData = {
      firstName: 'abc',
      lastName: 'def',
      birthDate: '2000-12-25',
      email: 'abc@def.com',
      phone: '+63 791 675 8914'
    };
    useParams.mockReturnValue({ userId: null });

    const dispatch = jest.fn();

    const navigate = jest.fn();
    const addUser = jest.fn();

    useDispatch.mockReturnValue(dispatch);
    useNavigate.mockReturnValue(navigate);
    post.mockResolvedValue({
      data: {
        id: 1,
        ...testData
      }
    });

    wrapperRender({ addUser });

    const fields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      birthDate: 'Birth Date',
      email: 'Email address',
      phone: 'Phone'
    };

    act(() => {
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          Simulate.change(screen.getByLabelText(element), {
            target: { value: testData[key], name: key }
          });
        }
      }
    });

    act(() => {
      Simulate.submit(screen.getByRole('form'));
    });
    
    expect(post).toBeCalled();
    expect(post).toBeCalledWith('/users/add', testData);
    await waitFor(() => expect(addUser).toBeCalled());
    expect(dispatch).toBeCalled();
    expect(navigate).toBeCalled();
    expect(navigate).toBeCalledWith('/');
  });
});
