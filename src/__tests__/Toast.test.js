import { cleanup, render, screen, within } from '@testing-library/react';
import Toast from '../components/Toast/Toast';

import { useSelector, useDispatch, Provider } from 'react-redux';
import { createPortal } from 'react-dom';
import store from '../store/index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn()
}));

const renderWithProvider = () => {
  return render(
    <Provider store={store}>
      <Toast />
    </Provider>
  );
};

describe('Navigation', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(() => {});
    createPortal.mockImplementation((component) => component);
  });
  afterAll(cleanup);

  it('should match snapshot for success', () => {
    useSelector.mockReturnValueOnce({
      status: 'success',
      title: 'Success',
      message: 'Success Message'
    });
    const { container } = renderWithProvider();
    expect(within(container).getByRole('alert')).toMatchSnapshot();
  });

  it('should match snapshot for error', () => {
    useSelector.mockReturnValueOnce({
      status: 'error',
      title: 'error',
      message: 'Error Message'
    });
    const { container } = renderWithProvider();
    expect(within(container).getByRole('alert')).toMatchSnapshot();
  });

  it('should not render toast when there is no notification', () => {
    useSelector.mockReturnValueOnce(null);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
