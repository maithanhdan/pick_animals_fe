import { Loading } from '@/components';
import React, { ReactNode, createContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

type AppContextType = {
  isLoadingCommom: boolean;
  setLoadingCustom: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const { loading: loadingAuth } = useSelector((state: any) => state.auth);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const listLoading = [loadingAuth, loadingCustom];
  const isLoadingCommom = useMemo(
    () => listLoading.some((item) => item),
    [listLoading, loadingCustom]
  );

  return (
    <AppContext.Provider value={{ isLoadingCommom, setLoadingCustom }}>
      {isLoadingCommom && <Loading />}
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
