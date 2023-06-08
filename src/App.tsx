import { Loading } from '@/components';
import { AppProvider } from '@/contexts/AppContext';
import RoutesConfig from '@/routes';
import { GlobalStyle } from '@/styles/global';
import i18n from '@/translate/i18n';
import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <GlobalStyle />
        <AppProvider>
          <I18nextProvider i18n={i18n}>
            <RoutesConfig />
          </I18nextProvider>
        </AppProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
