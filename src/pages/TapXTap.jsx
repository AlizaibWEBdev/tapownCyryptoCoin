import React, { useState, useEffect, useRef } from 'react';
import PlusOne from '../components/PlusOne';
import CoinsHave from '../components/CoinsHave';
import { useApi } from "../../context/ApiContext"

const TapXTap = () => {
    const [coins, setCoins] = useState(0);
    const [CoinsSpeed, setCoinsSpeed] = useState(5);
    const timeoutRef = useRef(null);
    const [animations, setAnimations] = useState([]);
    const [lastTapTime, setLastTapTime] = useState(0);
    const api = useApi();

    const makeApiRequest = () => {
        api.updateUserCoins("ikDoteen", coins + CoinsSpeed).then((e) => {
            console.log(e);
        })
    }

    const [boost, setBoost] = useState(() => {
        const savedBoost = localStorage.getItem('boost');
        return savedBoost ? parseInt(savedBoost, 10) : 500;
    });

    useEffect(() => {
        api.getUserCoins("ikDoteen").then((e) => {
            setCoins(e.data.coins)
        })

        setTimeout(() => {
            setCoinsSpeed(1)
        }, 20000);

        const savedBoost = localStorage.getItem('boost');
        const savedTimestamp = localStorage.getItem('boostTimestamp');
        if (savedBoost && savedTimestamp) {
            const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
            const newBoost = Math.min(500, parseInt(savedBoost, 10) + elapsedSeconds);
            setBoost(newBoost);
        }

        const interval = setInterval(() => {
            setBoost((prevBoost) => {
                if (prevBoost < 500) {
                    const newBoost = prevBoost + 1;
                    localStorage.setItem('boost', newBoost);
                    localStorage.setItem('boostTimestamp', Date.now());
                    return newBoost;
                }
                return prevBoost;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleTap = (event) => {
        const now = Date.now();

        if (boost > 0) {
            const newBoost = boost - 1;
            setBoost(newBoost);
            localStorage.setItem('boost', newBoost);
            localStorage.setItem('boostTimestamp', Date.now());
        } else if (now - lastTapTime < 500) {
            return;
        }

        setLastTapTime(now);

        const { clientX, clientY } = event;
        setCoins(coins + CoinsSpeed);
        const newAnimation = { id: Date.now(), x: clientX, y: clientY };
        setAnimations((prevAnimations) => [...prevAnimations, newAnimation]);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            makeApiRequest();
            timeoutRef.current = null;
        }, 1000);

        setTimeout(() => {
            setAnimations((prevAnimations) =>
                prevAnimations.filter((anim) => anim.id !== newAnimation.id)
            );
        }, 1000);

        setTimeout(() => {
            setAnimations((prevAnimations) =>
                prevAnimations.filter((anim) => anim.id !== newAnimation.id)
            );
        }, 1000);
    };


    useEffect(() => {
        const generateCoin = () => {
            const coin = document.createElement('div');
            coin.className = 'coin';
            coin.style.left = `${50 + Math.random() * 10 - 5}%`;
            coin.style.top = `${50 + Math.random() * 10 - 5}%`;
            coin.innerHTML = `<img src="coin.png" alt="" />`
            const angle = Math.random() * 360;
            const velocity = Math.random() * 10 + 1;

            const vx = Math.cos(angle * (Math.PI / 360)) * velocity;
            const vy = Math.sin(angle * (Math.PI / 360)) * velocity;

            coin.style.transform = `translate(-50%, -50%) rotate(0deg)`;
            document.body.appendChild(coin);

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
            setCoinsSpeed(1)
        }, 20000); 

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="center home" onClick={handleTap}>
            <br />
            <CoinsHave coins={coins} />
            
            <br />
            <img src="coin.png" alt="" style={{ maxWidth: '250px' }} />
            
            <span className="shadow"></span>
            <div style={{ margin: '20px 0' }}>
                <div className='center'>{boost} / 500 </div>
                <br />

                <div style={{
                    width: '300px',
                    height: '20px',
                    position: 'relative',
                    backgroundColor: '#ddd',
                    borderRadius: "20px"
                }}>
                    <div style={{
                        width: `${(boost / 500) * 100}%`,
                        height: '100%',
                        backgroundColor: '#ffaa00',
                        borderRadius: "20px"
                    }}></div>
                </div>
            </div>
            {animations.map((anim) => (
                <PlusOne key={anim.id} x={anim.x} y={anim.y} CoinsSpeed={CoinsSpeed} />
            ))}
        </div>
    );
};

export default TapXTap;
