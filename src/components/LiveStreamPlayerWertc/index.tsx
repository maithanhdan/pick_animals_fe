import React, { useEffect, useRef } from 'react';
import { WebRTCPlayer } from '@eyevinn/webrtc-player';

const LiveStreamPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let player: any;

  useEffect(() => {
    const loadPlayer = async () => {
      player = new WebRTCPlayer({
        video: videoRef.current!,
        type: 'video/mp4', // Replace with the actual video type
        iceServers: [], // Add ICE servers if needed
        debug: true, // Enable debug mode if necessary
      });

      try {
        await player.load(new URL('webrtc://localhost/live/livestream'));
      } catch (error) {
        console.error('Failed to load livestream:', error);
        // Handle error condition (e.g., show an error message)
        return;
      }

      return () => {
        // Stop the player and clean up resources when the component unmounts
        player.stop();
        player.destroy();
      };
    };

    loadPlayer();
  }, []);

  const handleMute = () => {
    player.mute();
  };

  const handleUnmute = () => {
    player.unmute();
  };

  return (
    <div>
      <video ref={videoRef} autoPlay controls />
      <button onClick={handleMute}>Mute</button>
      <button onClick={handleUnmute}>Unmute</button>
    </div>
  );
};

export default LiveStreamPlayer;
