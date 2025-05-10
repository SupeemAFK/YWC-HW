import { useEffect } from "react";
import confetti from "canvas-confetti";

const SadEffect = () => {
  useEffect(() => {
    const duration = Infinity;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 5,
      spread: 20,
      ticks: 100,
      gravity: 1.5,
      origin: { y: 0 },
      colors: ['#cccccc', '#999999', '#666666'],
      zIndex: 999,
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        ...defaults,
        particleCount: 20,
        angle: 90,
        scalar: 0.6,
        shapes: ['circle'],
        origin: {
          x: Math.random(),
          y: -0.1,
        },
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SadEffect;
