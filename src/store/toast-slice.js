import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: { notification: null },
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
