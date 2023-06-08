import { SelectLanguage, Toast } from '@/components';
import LiveStreamPlayerWertc from '@/components/LiveStreamPlayerWertc';
import { upWallet } from '@/constant/wallet';
import { AppContext } from '@/contexts/AppContext';
import { SessionStore } from '@/helpers/local';
import { UPEvent, UPEventType } from '@unipasswallet/popup-types';

import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
type LoginProps = { title?: string };
type DataSubmit = { email: string; password: string };
const Login: FC<LoginProps> = () => {
  const { t, i18n } = useTranslation();
  // const dispath = useDispatch();
  const navigate = useNavigate();
  const { setLoadingCustom } = useContext(AppContext);
  // const { handleSubmit, register } = useForm<DataSubmit>({
  //   mode: 'all',
  // });∆
  // const onLoginSuccess = async () => {
  //   await navigate('/');
  // };
  // const onSubmit: SubmitHandler<DataSubmit> = (data) => {
  //   const payload = { data, onSuccess: onLoginSuccess };
  //   dispath(login(payload));
  // };∆

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
      {/* <LiveStreamPlayerFLV />
      <LiveStreamPlayerM3U8 /> */}
      {/* <LiveStreamPlayerWertc /> */}
    </div>
  );
};

export default Login;
