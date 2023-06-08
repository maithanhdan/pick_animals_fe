import { STORAGE } from '@/constant/keyStoage';
import { SessionStore } from '@/helpers/local';

const ws: any = new WebSocket(
  `${import.meta.env.VITE_APP_WS}://192.168.100.57:7772`
);

const sendMessageWS = (message: string | number) => {
  const customeMessage = {
    email: SessionStore.get(STORAGE.INFOR_WALLET).email,
    address: SessionStore.get(STORAGE.INFOR_WALLET).address,
    message,
  };
  return ws.send(JSON.stringify(customeMessage));

  // const encoder = new TextEncoder();
  // const arrayBuffer = encoder.encode(JSON.stringify(customeMessage)).buffer;
  // return ws.send(arrayBuffer);
};

export { ws, sendMessageWS };
