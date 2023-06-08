import { API_URL } from '@/api';
import callAPI from '@/api/configApi';
import { STORAGE } from '@/constant/keyStoage';
import { LocalStore, SessionStore } from '@/helpers/local';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginCredentials {
  email: string;
  password?: string;
  address: string;
}

interface AuthState {
  loading: boolean;
  access_token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  access_token: null,
  error: null,
};

const login = createAsyncThunk(
  API_URL.auth.login,
  async (payload: { data: LoginCredentials; onSuccess: () => void }) => {
    const { data, onSuccess } = payload;
    const res = await callAPI({
      method: 'post',
      url: API_URL.auth.login,
      data: data,
      onSuccess,
    });
    return { ...res, accessToken: '12312321312' };
  }
);

const logout = createAsyncThunk<any, { onSuccess: () => void }>(
  API_URL.auth.logout,
  async (payload) => {
    try {
      const { onSuccess } = payload;
      const res = await callAPI({
        method: 'get',
        url: API_URL.auth.logout,
        onSuccess,
      });
      return res;
    } catch (error) {}
  }
);

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.fulfilled, (state, action) => {
      LocalStore.set('accessToken', action.payload.accessToken);
      return {
        ...state,
        loading: false,
        accessToken: action.payload.accessToken,
      };
    });
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    //logout
    builder.addCase(logout.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(logout.fulfilled, (state) => {
      LocalStore.remove(STORAGE.ACCESS_TOKEN);
      SessionStore.clear();
      return {
        ...state,
        access_token: null,
        loading: false,
      };
    });
    builder.addCase(logout.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export default authSlice.reducer;
export const { actions, reducer } = authSlice;
export { login, logout };
