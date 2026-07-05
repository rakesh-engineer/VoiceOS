'use client';

import { useState, useEffect, useCallback } from 'react';
import { TranscriptLine } from '@/types';

interface UseCallSimulationProps {
  lines: TranscriptLine[];
  lineDelay?: number;
  restartDelay?: number;
}

/**
 * Custom hook to control simulated conversational phone workflows in real-time.
 */
export function useCallSimulation({
  lines,
  lineDelay = 3200,
  restartDelay = 5000,
}: UseCallSimulationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [activeActions, setActiveActions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      if (currentLineIndex < lines.length - 1) {
        timer = setTimeout(() => {
          const nextIndex = currentLineIndex + 1;
          setCurrentLineIndex(nextIndex);

          // Update active integration statuses
          const line = lines[nextIndex];
          if (line.action) {
            setActiveActions((prev) => ({
              ...prev,
              [line.action!.type]: true,
            }));
          }
        }, lineDelay);
      } else {
        // Complete the call, wait restartDelay, then loop
        timer = setTimeout(() => {
          setCurrentLineIndex(-1);
          setActiveActions({});
        }, restartDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentLineIndex, lines, lineDelay, restartDelay]);

  const toggleSimulation = useCallback(() => {
    setIsPlaying((prev) => {
      const nextPlaying = !prev;
      if (nextPlaying && currentLineIndex === -1) {
        setCurrentLineIndex(0);
        setActiveActions({});
      }
      return nextPlaying;
    });
  }, [currentLineIndex]);

  const startSimulation = useCallback(() => {
    setIsPlaying(true);
    if (currentLineIndex === -1) {
      setCurrentLineIndex(0);
      setActiveActions({});
    }
  }, [currentLineIndex]);

  const stopSimulation = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    currentLineIndex,
    activeActions,
    toggleSimulation,
    startSimulation,
    stopSimulation,
  };
}
