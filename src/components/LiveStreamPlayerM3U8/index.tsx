import React from 'react';
import ReactPlayer from 'react-player';

const LiveStreamPlayerM3U8: React.FC = () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <ReactPlayer
        url='http://localhost:8080/live/livestream.m3u8'
        playing
        controls
        width='100%'
        height='auto'
      />
    </div>
  );
};

export default LiveStreamPlayerM3U8;
