import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import flvjs from 'flv.js';
interface ILiveStreamPlayerFLVProps {
  link: string;
}
const LiveStreamPlayerFLV: FC<ILiveStreamPlayerFLVProps> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let flvPlayer: flvjs.Player | null = null;
  flvjs.isSupported()

  const initializePlayer = useCallback(() => {
    flvPlayer = flvjs.createPlayer(
      {
        type: 'flv',
        url: link,
        isLive: true,
        hasVideo: true,
      },
      {
        seekType: 'range',
        rangeLoadZeroStart: true,
        enableStashBuffer: false,
        autoCleanupSourceBuffer: true,
        lazyLoad: false,
        lazyLoadMaxDuration: 99999
      }
    );

    if (videoRef.current && flvPlayer) {
      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      flvPlayer.play();
      setInterval(function () {
        if (!flvPlayer?.buffered.length) {
          return;
        }
        var end = flvPlayer.buffered.end(0);
        var diff = end - flvPlayer.currentTime;
        if (diff >= 0.4) {
          flvPlayer.currentTime = end - 0.1;
        }
      }, 300)
    }
    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
        flvPlayer = null;
      }
    };
  }, [])

  useEffect(() => {
    initializePlayer()
  }, [initializePlayer]);

  return (
    <div style={{ width: 500, height: 500 }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        width={'100%'}
        height={'100%'}
        muted={false}
        style={{ backgroundColor: 'black' }}
      />
    </div>
  );
};

export default LiveStreamPlayerFLV;