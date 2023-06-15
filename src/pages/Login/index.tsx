import { SelectLanguage, Toast } from '@/components';
// import LiveStreamPlayerFLV from '@/components/LiveStreamPlayerFLV';
import { upWallet } from '@/constant/wallet';
import { AppContext } from '@/contexts/AppContext';
import { SessionStore } from '@/helpers/local';
import { UPEvent, UPEventType } from '@unipasswallet/popup-types';

import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
type LoginProps = { title?: string };
const Login: FC<LoginProps> = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setLoadingCustom } = useContext(AppContext);

  const loginGoogle = async () => {
    setLoadingCustom(true);
    try {
      const account = await upWallet.login({
        email: true,
        eventListener: (event: UPEvent) => {
          console.log('event', event);
          const { type, body } = event;
          if (type === UPEventType.REGISTER) {
            console.log('register');
            console.log('account', body);
          }
        },
        connectType: 'both',
      });
      if (account) {
        const ws: any = new WebSocket(
          `${import.meta.env.VITE_APP_WS}://192.168.100.57:7772`
        );
        const a = setTimeout(() => {
          Toast({ type: 'error', message: 'server error!!' });
          SessionStore.clear();
          setLoadingCustom(false);
          clearTimeout(a);
        }, 5000);
        ws.onopen = () => {
          navigate('/');
          // sendMessageWS('first message');
          setLoadingCustom(false);
          clearTimeout(a);
        };
        ws.onerror = (error: any) => {
          console.log('login error', error);
          Toast({ type: 'error', message: 'server error!!' });
          setLoadingCustom(false);
          clearTimeout(a);
        };
        ws.onmessage = (mess: any) => {
          console.log('login onmessage', mess);
          clearTimeout(a);
        };
      }
    } catch (err) {
      setLoadingCustom(false);
      Toast({ type: 'error', message: 'Wallet error!!' });
      navigate('/login');
    }
  };

  return (
    <div>
      <div>{t('login.title')}</div>
      <SelectLanguage />
      <button onClick={loginGoogle}>login by google</button>
      {/* <LiveStreamPlayerFLV link={import.meta.env.VITE_APP_LINK_LIVESTREAM} /> */}
    </div>
  );
};

export default Login;
