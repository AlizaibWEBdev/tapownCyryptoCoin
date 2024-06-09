import React, { useState, useEffect,useRef } from 'react';
import PlusOne from '../components/PlusOne';
import CoinsHave from '../components/CoinsHave';
import {useApi} from "../../context/ApiContext"
const Home = () => {
    const [coins, setCoins] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [lastTapTime, setLastTapTime] = useState(0);
    const timeoutRef = useRef(null);
    const api = useApi()
  
    const makeApiRequest = () => {
    api.updateUserCoins("ikDoteen",coins+1).then((e)=>{
        console.log(e);
    })


    }
    const [boost, setBoost] = useState(() => {
        // Load the boost value from localStorage or default to 500
        const savedBoost = localStorage.getItem('boost');
        return savedBoost ? parseInt(savedBoost, 10) : 500;
    });

    useEffect(() => {
        api.getUserCoins("ikDoteen").then((e)=>{
            setCoins(e.data.coins)
        })
        // Calculate the boost based on the time elapsed since the last update
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
        setCoins(coins + 1);
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
        <div className="center home" onClick={handleTap}>
            <br />
            <CoinsHave coins={coins}  />
          
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
                    borderRadius:"20px"
                }}>
                    <div style={{
                        width: `${(boost / 500) * 100}%`,
                        height: '100%',
                        backgroundColor: '#ffaa00',
                        borderRadius:"20px",
                        border:"none",
                    }}></div>
                </div>
            </div>
            {animations.map((anim) => (
                <PlusOne key={anim.id} x={anim.x} y={anim.y} CoinsSpeed={1} />
            ))}
        </div>
    );
};

export default Home;
