import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type notification = {
  status: 'success' | 'error';
  title: string;
  message: string;
};

export interface ToastState {
  notification: notification | null;
}

const initialState: ToastState = { notification: null };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<notification>) => {
      const { status, title, message } = action.payload;
      state.notification = { status, title, message };
    },
    hideNotification: (state) => {
      state.notification = null;
    }
  }
});

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;
