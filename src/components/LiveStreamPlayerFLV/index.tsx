import React, { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

const LiveStreamPlayerFLV: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let flvPlayer: flvjs.Player | null = null;

    const initializePlayer = () => {
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://localhost:8080/live/livestream.flv',
      });

      if (videoRef.current && flvPlayer) {
        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
      }
    };

    initializePlayer();

    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: 500, height: 500 }}>
      <video ref={videoRef} controls autoPlay width={'100%'} height={'auto'} />
    </div>
  );
};

export default LiveStreamPlayerFLV;
