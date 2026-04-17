"use client";

import React, { createContext, useContext, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    // CRITICAL: This method must be called directly from a click event
    if (!audioRef.current) return;
    
    // Ensure settings are correct for mobile Safari
    audioRef.current.muted = false;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn("Audio playback delayed or blocked:", error);
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, playAudio, pauseAudio, togglePlay }}>
      {children}
      <audio
        ref={audioRef}
        src="/audio/hero.mp3"
        loop
        preload="auto"
        className="hidden"
        playsInline
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
