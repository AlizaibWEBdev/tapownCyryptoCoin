// src/CoinAnimation.js
import React, { useEffect,useRef } from 'react';

const CoinAnimation = () => {
    const coinContainerRef = useRef(null);

  useEffect(() => {
    const generateCoin = () => {
       
      const coin = document.createElement('div');
      coin.className = 'coin';
      coin.style.left = `${50 + Math.random() * 10 - 5}%`;
      coin.style.top = `${50 + Math.random() * 10 - 5}%`;

      // Generate random velocity and angle
      const angle = Math.random() * 360;
      const velocity = Math.random() * 2 + 1; // Random velocity between 1 and 3

      // Calculate horizontal and vertical velocities
      const vx = Math.cos(angle * (Math.PI / 180)) * velocity;
      const vy = Math.sin(angle * (Math.PI / 180)) * velocity;

      // Set initial style
      coin.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      document.getElementById("con").appendChild(coin);

      // Move the coin
      const moveCoin = () => {
        const rect = coin.getBoundingClientRect();
        if (
          rect.left + rect.width < 0 ||
          rect.top + rect.height < 0 ||
          rect.left > window.innerWidth ||
          rect.top > window.innerHeight
        ) {
          coin.remove();
        } else {
          coin.style.left = `${rect.left + vx}px`;
          coin.style.top = `${rect.top + vy}px`;
          coin.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
          requestAnimationFrame(moveCoin);
        }
      };

      moveCoin();
    };

    const interval = setInterval(generateCoin, 100); // Generate coins every 100 milliseconds

    const timer = setTimeout(() => {
      clearInterval(interval);
    }, 20000); // Stop generating coins after 20 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return <div ref={coinContainerRef} className="coin-container" id='con'></div>;
};

export default CoinAnimation;
