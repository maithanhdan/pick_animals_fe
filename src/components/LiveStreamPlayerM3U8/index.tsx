import React from 'react';
import ReactPlayer from 'react-player';
interface ILivestreamPlayerM3U8Props {
  link: string;
}
const LiveStreamPlayerM3U8: React.FC<ILivestreamPlayerM3U8Props> = ({
  link,
}) => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <ReactPlayer url={link} playing controls width='100%' height='auto' />
    </div>
  );
};

export default LiveStreamPlayerM3U8;
