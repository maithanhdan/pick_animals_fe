import { STORAGE } from '@/constant/keyStoage';
import { LocalStore, SessionStore } from '@/helpers/local';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const isUser = SessionStore.get(STORAGE.INFOR_WALLET);
  return isUser ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
