import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Toast.module.css';
import { toastActions } from '../../store/toast-slice';

const notiStatus = {
  success: '#5cb85c',
  error: '#d9534f'
};

const Toast = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      const interval = setTimeout(() => {
        dispatch(toastActions.hideNotification());
      }, 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }

  const { status, title, message } = notification;

  const content = (
    <div className={classes['notification-container']}>
      <div
        className={`${classes.notification} ${classes.toast}`}
        style={{ backgroundColor: notiStatus[status] }}
      >
        <button
          onClick={() => {
            dispatch(toastActions.hideNotification());
          }}
        >
          X
        </button>
        <div>
          <p className={classes['notification-title']}>{title}</p>
          <p className={classes['notification-message']}>{message}</p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.getElementById('toastNoti'));
};

export default Toast;
