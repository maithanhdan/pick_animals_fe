import { sendMessageWS } from '@/helpers/socket';
import React, { FC, useEffect, useState } from 'react';
import { styled } from 'styled-components';

type RoomControlProps = {};
type ButtonType = {
  name: string;
  type: number;
};
const GroupButtonControlStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin: 20px;
`;
const GroupButtonArrowStyled = styled.div`
  width: 240px;
`;
const ButtonArrowStyled = styled.button`
  outline: none;
  border-radius: 50%;
  border: 1px solid black;
  background: white;
  height: 80px;
  width: 80px;
`;

const ButtonStartGame = styled.button`
  outline: none;
  border: 1px solid black;
  background: white;
  height: 40px;
  width: 80px;
  cursor: pointer;
  &:disabled {
    background-color: rgba(16, 16, 16, 0.1);
    border: none;
  }
`;
const RoomControl: FC<RoomControlProps> = () => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    //handle action from client
    if (start) {
      function handleKeyDown(e: any) {
        console.log(e.keyCode);
        switch (e.keyCode) {
          case 32:
            sendMessageWS({ cmd: 'operation', type: 4 });
            break;
          case 37:
            sendMessageWS({ cmd: 'operation', type: 2 });
            break;
          case 38:
            sendMessageWS({ cmd: 'operation', type: 1 });
            break;
          case 39:
            sendMessageWS({ cmd: 'operation', type: 3 });
            break;
          case 40:
            sendMessageWS({ cmd: 'operation', type: 0 });
            break;
          default:
            break;
        }
      }
      document.addEventListener('keypress', handleKeyDown);

      // Don't forget to clean up
      return function cleanup() {
        document.removeEventListener('keypress', handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    //handle action from client
    if (start) {
      function handleKeyup(e: any) {
        console.log('up');
        sendMessageWS({ cmd: 'operation', type: 5 });
      }
      document.addEventListener('keyup', handleKeyup);

      // Don't forget to clean up
      return function cleanup() {
        document.removeEventListener('keyup', handleKeyup);
      };
    }
  }, []);

  const ButtonClick: FC<ButtonType> = ({ name, type }) => (
    <ButtonArrowStyled
      onMouseDown={() => {
        console.log(`${name} down`);
        sendMessageWS({ cmd: 'operation', type });
      }}
      onMouseUp={() => {
        console.log('mouse up');
        sendMessageWS({ cmd: 'operation', type: 0 });
      }}
    >
      {name}
    </ButtonArrowStyled>
  );

  return (
    <div style={{ marginTop: 20 }}>
      <ButtonStartGame
        onClick={() => {
          setStart(true);
          sendMessageWS({ cmd: 'start_game' });
        }}
        disabled={start}
      >
        Start game
      </ButtonStartGame>
      <GroupButtonControlStyled>
        <GroupButtonArrowStyled>
          <div style={{ textAlign: 'center' }}>
            <ButtonClick name='Up' type={1} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ButtonClick name='Left' type={2} />
            <ButtonClick name='Right' type={3} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <ButtonClick name='Down' type={0} />
          </div>
        </GroupButtonArrowStyled>
        <ButtonClick name='Grasp' type={4} />
      </GroupButtonControlStyled>
    </div>
  );
};

export default RoomControl;
