import { Component } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import classes from './Toast.module.css';
import { toastActions } from '../../store/toast-slice';

const notiStatus = {
  success: '#5cb85c',
  error: '#d9534f'
};

class Toast extends Component {
  static interval = null;

  componentDidUpdate() {
    if (this.props.notification) {
      this.interval = setTimeout(() => {
        this.props.hideNotification();
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  render() {
    const { notification, hideNotification } = this.props;

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
              hideNotification();
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
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNotification: () => dispatch(toastActions.hideNotification())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
