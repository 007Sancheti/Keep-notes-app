import { createSlice } from '@reduxjs/toolkit';
import { createSagaAction } from 'saga-toolkit';

const name = 'user';
const initialState = {
    user: {},
    loggedIn: false,
};

export const userLogin = createSagaAction(`${name}/userLogin`)
export const signOut = createSagaAction(`${name}/signOut`)

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    restoreUserInfo: (state, action) => {
      state.user = action.payload;
      state.loggedIn =  true;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
      state.loggedIn =  true;
    },
    clearUserInfo: (state) => {
      state.user = {};
      state.loggedIn = false;
    }
  },
  extraReducers: {
    [signOut.fulfilled]: () => ({
      user: {},
      loggedIn: false
    }),
  },
});

export const {restoreUserInfo, setUserInfo, clearUserInfo} = userSlice.actions;

export default userSlice.reducer;
