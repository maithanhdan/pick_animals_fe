import { STORAGE } from '@/constant/keyStoage';
import { LocalStore, SessionStore } from '@/helpers/local';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const isUser = SessionStore.get(STORAGE.INFOR_WALLET);
  return !isUser ? <Outlet /> : <Navigate to='/' />;
};

export default PublicRoutes;
