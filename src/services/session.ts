import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getLocalStorageItem = (key: string, defaultValue: any) => {
  if(typeof localStorage !== 'undefined') 
    {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
}

const initialState = {
  stateSession: getLocalStorageItem('stateSession', 0),
  token: getLocalStorageItem('token', null),
  name: getLocalStorageItem('name', '')
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    LOGIN: (state) => {
      state.stateSession = 1;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('stateSession', '1');
      }
    },
    LOGOUT: (state) => {
      state.stateSession = 0;
      state.token = null;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('stateSession',state.stateSession);
        localStorage.setItem('token', state.token);
        localStorage.setItem('rol', '');
        localStorage.setItem('name', '');
      }
    },
    setSession: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if(typeof localStorage !== 'undefined'){
        localStorage.setItem('token', action.payload);
      }
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('name', action.payload);
      }
    },
  },
});

export const { LOGIN, LOGOUT, setSession, setName } = sessionSlice.actions;

export default sessionSlice.reducer;