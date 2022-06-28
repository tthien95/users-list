import { cleanup, render, screen } from '@testing-library/react';
import Toast from '../components/Toast/Toast';

import * as Redux from 'react-redux';
import store from '../store/index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((component, container) => component)
}));

const renderWithProvider = () => {
  return render(
    <Redux.Provider store={store}>
      <Toast />
    </Redux.Provider>
  );
};

describe('Navigation', () => {
  afterAll(cleanup);

  it('should match snapshot for success', () => {
    Redux.useSelector.mockReturnValueOnce({
      status: 'success',
      title: 'Success',
      message: 'Success Message'
    });
    const { asFragment } = renderWithProvider();
    expect(asFragment(<Toast />)).toMatchSnapshot();
  });

  it('should match snapshot for error', () => {
    Redux.useSelector.mockReturnValueOnce({
      status: 'error',
      title: 'error',
      message: 'Error Message'
    });
    const { asFragment } = renderWithProvider();
    expect(asFragment(<Toast />)).toMatchSnapshot();
  });

  it('should not render toast when there is no notification', () => {
    Redux.useSelector.mockReturnValueOnce(null);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
