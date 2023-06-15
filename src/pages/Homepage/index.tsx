import { Header, Layout, Toast } from '@/components';
import LiveStreamPlayerFLV from '@/components/LiveStreamPlayerFLV';
import { STORAGE } from '@/constant/keyStoage';
import { SessionStore } from '@/helpers/local';
import { sendMessageWS, ws } from '@/helpers/socket';
import { I_INFOR_WALLET } from '@/interface';
import { logout } from '@/store/auth';
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type HomepageProps = { title?: string };

const Homepage: FC<HomepageProps> = ({ title }) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const refAction = useRef<HTMLInputElement>(null);

  const handlLogout = () => {
    ws.close();
    const onSuccess = () => {
      navigate('/login');
    };
    const payload = { onSuccess };
    dispath(logout(payload));
  };

  const INFOR_WALLET: I_INFOR_WALLET | null = SessionStore.get(
    STORAGE.INFOR_WALLET
  );

  useEffect(() => {
    if (INFOR_WALLET) {
      ws.onopen = () => {};
      ws.onerror = (error: any) => {
        console.log('error', error);
        Toast({ type: 'error', message: 'server error!!' });
        handlLogout();
      };
      ws.onmessage = (mess: any) => {
        console.log('mess from server', mess);
        Toast({ type: 'success', message: mess.data });
      };
      ws.onclose = (mess: any) => {
        console.log('homepage onclose', mess);
        Toast({
          message: `${mess.reason} \n Disconnect server!!`,
          type: 'error',
        });
        handlLogout();
      };
    }
  }, [INFOR_WALLET, ws]);

  useEffect(() => {
    //handle action from client
    if (refAction) {
      function handleKeyDown(e: any) {
        console.log(e.keyCode);
      }

      document.addEventListener('keydown', handleKeyDown);

      // Don't forget to clean up
      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return (
    <Layout innerRef={refAction}>
      <Header />
      <div>{title}</div>
      <button onClick={handlLogout}>logout</button>
      <div>
        <button
          onClick={() => {
            sendMessageWS('hello');
          }}
        >
          send socket
        </button>

        <button
          onClick={() => {
            handlLogout();
          }}
        >
          disconnect socket
        </button>
        <LiveStreamPlayerFLV link={import.meta.env.VITE_APP_LINK_LIVESTREAM} />
      </div>
    </Layout>
  );
};

export default Homepage;
