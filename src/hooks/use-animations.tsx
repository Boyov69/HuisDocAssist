
import { useState, useEffect } from 'react';

type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';
type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate';

interface AnimationOptions {
  duration?: number;
  delay?: number;
  type?: AnimationType;
  customClass?: string;
}

export function useAnimation(
  initialVisible: boolean = false,
  options: AnimationOptions = {}
) {
  const { 
    duration = 300,
    delay = 0,
    type = 'fade',
    customClass
  } = options;
  
  const [visible, setVisible] = useState(initialVisible);
  const [animationState, setAnimationState] = useState<AnimationState>(
    initialVisible ? 'entered' : 'exited'
  );

  useEffect(() => {
    let enterTimeoutId: NodeJS.Timeout;
    let exitTimeoutId: NodeJS.Timeout;

    if (visible && animationState === 'exited') {
      setAnimationState('entering');
      enterTimeoutId = setTimeout(() => {
        setAnimationState('entered');
      }, duration);
    } else if (!visible && animationState === 'entered') {
      setAnimationState('exiting');
      exitTimeoutId = setTimeout(() => {
        setAnimationState('exited');
      }, duration);
    }

    return () => {
      if (enterTimeoutId) clearTimeout(enterTimeoutId);
      if (exitTimeoutId) clearTimeout(exitTimeoutId);
    };
  }, [visible, animationState, duration]);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((prev) => !prev);

  const getAnimationClassName = () => {
    if (customClass) return customClass;
    
    switch (type) {
      case 'fade':
        return animationState === 'entering' || animationState === 'entered' 
          ? 'animate-fade-in' 
          : 'animate-fade-out';
      case 'slide':
        return animationState === 'entering' || animationState === 'entered' 
          ? 'animate-slide-in-right' 
          : 'animate-slide-out-right';
      case 'scale':
        return animationState === 'entering' || animationState === 'entered' 
          ? 'animate-scale-in' 
          : 'animate-scale-out';
      case 'rotate':
        return animationState === 'entering' || animationState === 'entered' 
          ? 'animate-rotate-in' 
          : 'animate-rotate-out';
      default:
        return '';
    }
  };

  return {
    visible,
    animationState,
    show,
    hide,
    toggle,
    isAnimating: animationState === 'entering' || animationState === 'exiting',
    isVisible: animationState !== 'exited',
    animationClassName: getAnimationClassName(),
    style: { 
      transitionDuration: `${duration}ms`,
      transitionDelay: delay ? `${delay}ms` : undefined
    }
  };
}
