import { Layout, Toast } from '@/components';
import LiveStreamPlayerFLV from '@/components/LiveStreamPlayerFLV';
import { STORAGE } from '@/constant/keyStoage';
import { SessionStore } from '@/helpers/local';
import { sendMessageWS, ws } from '@/helpers/socket';
import { I_INFOR_WALLET } from '@/interface';
import RoomControl from '@/pages/Homepage/RoomControl';
import { logout } from '@/store/auth';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type HomepageProps = {};

const Homepage: FC<HomepageProps> = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const refAction = useRef<HTMLInputElement>(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handlLogout = () => {
    ws.close();
    const onSuccess = () => {
      navigate('/login');
    };
    const payload = { onSuccess };
    sendMessageWS({ cmd: 'exit_room' });
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
      ws.onmessage = async (mess: any) => {
        console.log('mess from server', mess.data);
        const buffer = await new Response(mess.data).arrayBuffer();
        const uint = new Uint8Array(buffer);
        var string = new TextDecoder().decode(uint.slice(3, uint.length));
        console.log(string);
        var cmd = JSON.parse(string);
        commandExecute(cmd);
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

  const commandExecute = (cmd: any) => {
    switch (cmd.cmd) {
      case 'reply_roomlist':
        Toast({ type: 'success', message: 'reply_roomlist' });
        setRooms(cmd.rooms);
        break;
      default:
        Toast({ type: 'success', message: cmd });
        break;
    }
  };

  return (
    <Layout innerRef={refAction}>
      <div>
        <button
          onClick={() => {
            sendMessageWS({ cmd: 'req_roomlist' });
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
        {selectedRoom !== '' ? (
          <RoomControl />
        ) : (
          <div style={{ marginTop: 20 }}>
            {rooms.map((value: string, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    sendMessageWS({ cmd: 'enter_room', mac: value });
                    setSelectedRoom(value.toString());
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
