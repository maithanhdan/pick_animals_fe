import { STORAGE } from '@/constant/keyStoage';
import { SessionStore } from '@/helpers/local';

const ws: any = new WebSocket(
  `${import.meta.env.VITE_APP_WS_IPCONFIG}`
);

const sendMessageWS = (message: object) => {
  const customeMessage = {
    email: SessionStore.get(STORAGE.INFOR_WALLET).email,
    address: SessionStore.get(STORAGE.INFOR_WALLET).address,
    message: new Uint8Array(),
  };
  // return ws.send(JSON.stringify(customeMessage));
  const mess = JSON.stringify(message);
  // console.log(mess);
  var arr_mess = new Uint8Array(3 + mess.length);
  arr_mess[0] = 0xda;
  arr_mess[1] = Math.trunc(mess.length / 256);
  arr_mess[2] = Math.trunc(mess.length % 256);
  // console.log(arr_mess);
  const encoder = new TextEncoder();
  const arrayBufferMess = encoder.encode(mess);
  // console.log(arrayBufferMess);
  let buffer = new Uint8Array(3 + arrayBufferMess.length);
  buffer.set(arr_mess, 0);
  buffer.set(arrayBufferMess, 3);
  customeMessage.message = buffer;
  console.log(buffer);
  return ws.send(JSON.stringify(customeMessage));
};

export { ws, sendMessageWS };
