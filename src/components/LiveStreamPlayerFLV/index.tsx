import React, { FC, useEffect, useRef } from 'react';
import flvjs from 'flv.js';
interface ILiveStreamPlayerFLVProps {
  link: string;
}
const LiveStreamPlayerFLV: FC<ILiveStreamPlayerFLVProps> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let flvPlayer: flvjs.Player | null = null;

  const initializePlayer = () => {
    flvPlayer = flvjs.createPlayer(
      {
        type: 'flv',
        url: link,
        isLive: true,
      },
      { seekType: 'range', rangeLoadZeroStart: true }
    );

    if (videoRef.current && flvPlayer) {
      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      flvPlayer.play();
    }
  };
  useEffect(() => {
    initializePlayer();
  }, []);

  return (
    <div style={{ width: 500, height: 500 }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        width={'100%'}
        height={'auto'}
        muted={false}
      />
    </div>
  );
};

export default LiveStreamPlayerFLV;

// import React, { FC, useEffect, useRef } from 'react';
// import flvjs from 'flv.js';

// interface ILiveStreamPlayerFLVProps {
//   link: string;
// }

// const LiveStreamPlayerFLV: FC<ILiveStreamPlayerFLVProps> = ({ link }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   let flvPlayer: flvjs.Player | null = null;
//   useEffect(() => {
//     const initializePlayer = () => {
//       flvPlayer = flvjs.createPlayer({
//         type: 'flv',
//         url: link,
//       });

//       if (videoRef.current && flvPlayer) {
//         flvPlayer.attachMediaElement(videoRef.current);
//         flvPlayer.load();
//       }
//     };

//     initializePlayer();

//     return () => {
//       if (flvPlayer) {
//         flvPlayer.unload();
//         flvPlayer.detachMediaElement();
//         flvPlayer.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (videoRef.current) {
//       const videoElement = videoRef.current;
//       const url = link;
//       const range = 'bytes=0-9999'; // Specify the desired range of bytes

//       if (flvjs.isSupported()) {
//         const mediaDataSource = {
//           type: 'flv',
//           url: `${url}?${range}`, // Append the range to the URL
//         };
//         flvPlayer = flvjs.createPlayer(mediaDataSource, {
//           enableStashBuffer: false, // Disable buffer for seeking
//         });

//         flvPlayer.attachMediaElement(videoElement);
//         flvPlayer.load();
//       }
//     }

//     return () => {
//       if (flvPlayer) {
//         flvPlayer.destroy();
//         flvPlayer = null;
//       }
//     };
//   }, [link]);

//   return (
//     <div style={{ width: 500, height: 500 }}>
//       <video ref={videoRef} controls autoPlay width={'100%'} height={'auto'} />
//     </div>
//   );
// };

// export default LiveStreamPlayerFLV;
