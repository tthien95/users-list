import { createSlice } from '@reduxjs/toolkit';

export interface ToastState {
  notification: {
    status: 'success' | 'error';
    title: string;
    message: string;
  } | null;
}

const initialState: ToastState = { notification: null };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showNotification: (state, action) => {
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
