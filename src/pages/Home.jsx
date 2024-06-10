import React, { useState, useEffect, useRef } from 'react';
import PlusOne from '../components/PlusOne';
import CoinsHave from '../components/CoinsHave';
import { useApi } from "../../context/ApiContext"
const Home = () => {




    const [CoinsSpeed, setCoinsSpeed] = useState(1)

    const [coins, setCoins] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [lastTapTime, setLastTapTime] = useState(0);
    const timeoutRef = useRef(null);
    const [energylimit, setenergylimit] = useState(500);
    const [rechargingspeed, setrechargingspeed] = useState(1)


    const api = useApi()
    const makeApiRequest = () => { api.updateUserCoins("ikDoteen", coins + CoinsSpeed).then(() => { }) }

    const [boost, setBoost] = useState(() => { const savedBoost = localStorage.getItem('boost'); return savedBoost ? parseInt(savedBoost, 10) : energylimit; });



    useEffect(() => {
        api.getUserCoins("ikDoteen").then((e) => { setCoins(e.data.coins) })

        let data = localStorage.getItem("boosters")
        if (data) {
            data = JSON.parse(localStorage.boosters);

            data.map((obj) => {
                if (obj.name == "Multitap") {
                    setCoinsSpeed(obj.level)
                }
                if (obj.name == "Energy Limit") {
                    setenergylimit(energylimit * obj.level);
                }
                if (obj.name == "Recharging Speed") {
                    setrechargingspeed(obj.level)
                }

            })
        }

        const savedBoost = localStorage.getItem('boost');
        const savedTimestamp = localStorage.getItem('boostTimestamp');

        if (savedBoost && savedTimestamp) {
            const elapsedSeconds = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
            const newBoost = Math.min(energylimit, parseInt(savedBoost, 10) + elapsedSeconds);
            setBoost(newBoost);
        }

        const interval = setInterval(() => {
            setBoost((prevBoost) => {
                if (prevBoost < energylimit) {
                    const newBoost = prevBoost + rechargingspeed;
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
            const newBoost = boost - CoinsSpeed; ``
            setBoost(newBoost);
            localStorage.setItem('boost', newBoost);
            localStorage.setItem('boostTimestamp', Date.now());
        } else if (now - lastTapTime < energylimit) {
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

        // Set a new timeout to call the API request after 2 seconds of inactivity
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

    return (
        <div className="center home" >
            <br />
            <CoinsHave coins={coins} />

            <br />
            <img src="coin.png" alt="" style={{ maxWidth: '250px' }} 
            onClick={(e) => {
                const tapCount = 1;
                for (let i = 0; i < tapCount; i++) {
                  handleTap(e);
                }
              }}
              onTouchStart={(e) => {
                const touches = e.touches.length;
                for (let i = 0; i < touches; i++) {
                  handleTap(e.touches[i]);
                }
              }}
            />
            <span className="shadow"></span>
            <div style={{ margin: '20px 0' }}>
                <div className='center'>{boost} / {energylimit} </div>
                <br />

                <div style={{

                    width: '300px',
                    height: '20px',
                    position: 'relative',
                    backgroundColor: '#ddd',
                    borderRadius: "20px"
                }}>
                    <div style={{
                        width: `${(boost / energylimit) * 100}%`,
                        height: '100%',
                        backgroundColor: '#ffaa00',
                        borderRadius: "20px",
                        border: "none",
                    }}></div>
                </div>
            </div>
            {animations.map((anim) => (
                <PlusOne key={anim.id} x={anim.x} y={anim.y} CoinsSpeed={CoinsSpeed} />
            ))}
        </div>
    );
};

export default Home;
