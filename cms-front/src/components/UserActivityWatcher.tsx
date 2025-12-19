"use client";

import { useEffect, useRef, useCallback } from "react";

interface UserActivityWatcherProps {
  timeout?: number; // Timeout in milliseconds
  onInactive?: () => void;
  onActive?: () => void;
}

export function UserActivityWatcher({
  timeout = 15 * 60 * 1000, // 15 minutes default
  onInactive,
  onActive,
}: UserActivityWatcherProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInactiveRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isInactiveRef.current) {
      isInactiveRef.current = false;
      onActive?.();
    }

    timeoutRef.current = setTimeout(() => {
      isInactiveRef.current = true;
      onInactive?.();
    }, timeout);
  }, [timeout, onInactive, onActive]);

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start timer
    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return null;
}

export default UserActivityWatcher;
