import { MOVE_DIRECTION } from '@/constant/NumberControlMechine';
import { sendMessageWS } from '@/helpers/socket';
import React, { FC, useEffect } from 'react';
import { styled } from 'styled-components';

type RoomControlProps = { startGame: boolean };
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
const RoomControl: FC<RoomControlProps> = ({ startGame }) => {
  useEffect(() => {
    //handle action from client
    if (startGame) {
      function handleKeyDown(e: any) {
        console.log(e.keyCode);
        switch (e.keyCode) {
          case 32:
            sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.GRASP });
            break;
          case 37:
            sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.LEFT });
            break;
          case 38:
            sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.UP });
            break;
          case 39:
            sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.RIGHT });
            break;
          case 40:
            sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.DOWN });
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
    if (startGame) {
      function handleKeyup(e: any) {
        console.log('up');
        sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.STOP });
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
        sendMessageWS({ cmd: 'operation', type: MOVE_DIRECTION.STOP });
      }}
    >
      {name}
    </ButtonArrowStyled>
  );

  return (
    <div style={{ marginTop: 20 }}>
      <ButtonStartGame
        onClick={() => {
          sendMessageWS({ cmd: 'start_game' });
        }}
        disabled={startGame}
      >
        Start game
      </ButtonStartGame>
      {startGame && (
        <GroupButtonControlStyled>
          <GroupButtonArrowStyled>
            <div style={{ textAlign: 'center' }}>
              <ButtonClick name='Up' type={MOVE_DIRECTION.UP} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ButtonClick name='Left' type={MOVE_DIRECTION.LEFT} />
              <ButtonClick name='Right' type={MOVE_DIRECTION.RIGHT} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <ButtonClick name='Down' type={MOVE_DIRECTION.DOWN} />
            </div>
          </GroupButtonArrowStyled>
          <ButtonClick name='Grasp' type={MOVE_DIRECTION.GRASP} />
        </GroupButtonControlStyled>
      )}
    </div>
  );
};

export default RoomControl;
