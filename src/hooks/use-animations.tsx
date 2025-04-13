
import { useState, useEffect } from 'react';

type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

export function useAnimation(
  initialVisible: boolean = false,
  duration: number = 300
) {
  const [visible, setVisible] = useState(initialVisible);
  const [animationState, setAnimationState] = useState<AnimationState>(
    initialVisible ? 'entered' : 'exited'
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (visible && animationState === 'exited') {
      setAnimationState('entering');
      timeoutId = setTimeout(() => {
        setAnimationState('entered');
      }, duration);
    } else if (!visible && animationState === 'entered') {
      setAnimationState('exiting');
      timeoutId = setTimeout(() => {
        setAnimationState('exited');
      }, duration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visible, animationState, duration]);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((prev) => !prev);

  return {
    visible,
    animationState,
    show,
    hide,
    toggle,
    isAnimating: animationState === 'entering' || animationState === 'exiting',
    isVisible: animationState !== 'exited',
  };
}
