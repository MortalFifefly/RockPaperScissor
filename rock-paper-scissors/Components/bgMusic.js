'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start with muted audio

  // Ensure the code runs only in the client-side environment
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle user interaction to unmute audio
  const handleUserInteraction = () => {
    if (isMuted) {
      setIsMuted(false);
      console.log("Audio is unmuted after user interaction.");
    }
  };

  // Add event listeners for user interaction
  useEffect(() => {
    if (isClient) {
      window.addEventListener('click', handleUserInteraction);
      window.addEventListener('scroll', handleUserInteraction);

      return () => {
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('scroll', handleUserInteraction);
      };
    }
  }, [isClient]);

  // Autoplay and mute logic (running after user interaction)
  useEffect(() => {
    if (isClient && audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.05;
      audio.loop = true;
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      audio.muted = isMuted; // Audio starts muted

      audio.play().catch((error) => {
        console.log('Autoplay blocked:', error);
      });
    }
  }, [isMuted, isClient]); // Run again when isMuted changes

  return isClient ? (
    <audio ref={audioRef} src="/music/music.mp3" />
  ) : null;
}
