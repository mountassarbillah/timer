import { useEffect, useRef, useState } from "react";

interface AlarmOnToggleProps {
    isActive: boolean;
}

export default function AlarmOnToggle({ isActive }: AlarmOnToggleProps) {
  const audioRef = useRef(null);
  const prevIsActiveRef = useRef(isActive);

  useEffect(() => {
    // Check if isActive changed from true to false
    if (prevIsActiveRef.current === true && isActive === false) {
      if (audioRef.current) {
        audioRef.current.play();
        // Stop after 10 seconds
        setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }, 10000);
      }
    }
    prevIsActiveRef.current = isActive;
  }, [isActive])
  return <audio ref={audioRef} src="/alarm.mp3" />;
}
