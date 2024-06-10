import React, { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import CoinsHave from '../components/CoinsHave';
import { useNavigate } from 'react-router-dom';
import GameModal from '../components/GameModal';


const Boost = () => {
    const [msg, setmsg] = useState("hi")
    const [openmodal, setopenmodal] = useState(false)
    const [imgsrc, setimgsrc] = useState("coin.png");


    const boostersData = [
        { id: 1, name: 'Multitap', price: 300000, level: 1, icon: 'hello.png' },
        { id: 2, name: 'Energy Limit', price: 400000, level: 1, icon: 'flash.png' },
        { id: 3, name: 'Recharging Speed', price: 200, level: 1, icon: 'battery.png' },


    ];
    const [boosters, setBoosters] = useState(boostersData);
    const openmsgmodal = (img,msg)=>{
            setimgsrc(img);
            setmsg(msg);
            setopenmodal(true)
    }

    const handleBuyBooster = async (booster) => {
        if (coins >= booster.price) {
            const newBoosters = boosters.map(b => {
                if (b.id === booster.id) {
                    let newLevel = b.level;
                    let newPrice = b.price;

                    if (b.name === 'Energy Limit') {
                        newLevel = b.level + 1;
                    } else if (b.name === 'Multitap') {
                        newLevel = b.level + 1;
                    } else if (b.name === 'Recharging Speed') {
                        newLevel = b.level + 1;
                    } else if (b.name === 'Tap Bot') {
                        localStorage.setItem('tap_bot', 'purchased');
                    }

                    newPrice = b.price * 2;
                    return { ...b, price: newPrice, level: newLevel };
                }
                return b;
            });

            setBoosters(newBoosters);
            setCoins(coins - booster.price);
            localStorage.setItem('boosters', JSON.stringify(newBoosters));

            await api.updateUserCoins("ikDoteen", coins - booster.price);
            openmsgmodal(booster.image,`You have purchased ${booster.name} booster!`)
            alert();
        } else {
            openmsgmodal("low.png",'Not enough coins to buy this booster.');
        }
    };




    const [coins, setCoins] = useState(0);
    const api = useApi();
    const navigate = useNavigate();
    const initialBoosts = 3;
   


    // State for Tank Fills
    const [tankfillsCount, setTankfillsCount] = useState(() => {
        const savedTankfills = localStorage.getItem("tankfills");
        return savedTankfills ? parseInt(savedTankfills) : initialBoosts;
    });

    // State for Taping Guru
    const [tapingGuruCount, setTapingGuruCount] = useState(() => {
        const savedTapingGuru = localStorage.getItem("tapingGuru");
        return savedTapingGuru ? parseInt(savedTapingGuru) : initialBoosts;
    });

    // Separate last used timestamps for each boost type
    const [lastUsedTank, setLastUsedTank] = useState(() => {
        const savedLastUsedTank = localStorage.getItem("lastUsedTank");
        return savedLastUsedTank ? parseInt(savedLastUsedTank) : null;
    });

    const [lastUsedTapingGuru, setLastUsedTapingGuru] = useState(() => {
        const savedLastUsedTapingGuru = localStorage.getItem("lastUsedTapingGuru");
        return savedLastUsedTapingGuru ? parseInt(savedLastUsedTapingGuru) : null;
    });

    const [timeRemainingTank, setTimeRemainingTank] = useState(null);
    const [timeRemainingTapingGuru, setTimeRemainingTapingGuru] = useState(null);
    const [isTapingGuruModalOpen, setIsTapingGuruModalOpen] = useState(false);
    useEffect(() => {
        const savedCoins = localStorage.getItem('coins');
        if (savedCoins) {
            setCoins(parseInt(savedCoins));
        }
    }, [])

    useEffect(() => {

        const savedBoosters = localStorage.getItem('boosters');
        const savedCoins = localStorage.getItem('coins');

        if (savedBoosters) {
            setBoosters(JSON.parse(savedBoosters));
        }

        if (savedCoins) {
            setCoins(parseInt(savedCoins));
        }
        api.getUserCoins("ikDoteen").then((e) => {
            setCoins(e.data.coins);
        });

        const now = Date.now();

        // Handle Tank Fill cooldown
        if (lastUsedTank) {
            const timeDiff = now - lastUsedTank;
            if (timeDiff > 24 * 60 * 60 * 1000) {
                resetTankBoosts();
            } else {
                setTimeRemainingTank(24 * 60 * 60 * 1000 - timeDiff);
            }
        }

        // Handle Taping Guru cooldown
        if (lastUsedTapingGuru) {
            const timeDiff = now - lastUsedTapingGuru;
            if (timeDiff > 24 * 60 * 60 * 1000) {
                resetTapingGuruBoosts();
            } else {
                setTimeRemainingTapingGuru(24 * 60 * 60 * 1000 - timeDiff);
            }
        }
    }, [api, lastUsedTank, lastUsedTapingGuru]);

    useEffect(() => {
        if (timeRemainingTank !== null) {
            const interval = setInterval(() => {
                setTimeRemainingTank(prev => {
                    if (prev <= 1000) {
                        clearInterval(interval);
                        resetTankBoosts();
                        return null;
                    }
                    return prev - 1000;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeRemainingTank]);

    useEffect(() => {
        if (timeRemainingTapingGuru !== null) {
            const interval = setInterval(() => {
                setTimeRemainingTapingGuru(prev => {
                    if (prev <= 1000) {
                        clearInterval(interval);
                        resetTapingGuruBoosts();
                        return null;
                    }
                    return prev - 1000;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeRemainingTapingGuru]);

    const allFillsAreUsed = (type) => {
        const now = Date.now();
        if (type === 'tank') {
            localStorage.setItem("lastUsedTank", now);
            setLastUsedTank(now);
            setTimeRemainingTank(24 * 60 * 60 * 1000);
        } else if (type === 'tapingGuru') {
            localStorage.setItem("lastUsedTapingGuru", now);
            setLastUsedTapingGuru(now);
            setTimeRemainingTapingGuru(24 * 60 * 60 * 1000);
        }
    };

    const fillBoost = () => {
        if (tankfillsCount > 0) {
            localStorage.setItem("boost", 500);
            const newCount = tankfillsCount - 1;
            localStorage.setItem("tankfills", newCount);
            setTankfillsCount(newCount);

            if (newCount === 0) {
                allFillsAreUsed('tank');
            }
        }
    };

    const useTapingGuru = () => {
        if (tapingGuruCount > 0) {
            const newCount = tapingGuruCount - 1;
            localStorage.setItem("tapingGuru", newCount);
            setTapingGuruCount(newCount);

            if (newCount === 0) {
                allFillsAreUsed('tapingGuru');
            }

            navigate("/TapXTap");
        }
    };

    const resetTankBoosts = () => {
        localStorage.setItem("tankfills", initialBoosts);
        setTankfillsCount(initialBoosts);
        localStorage.removeItem("lastUsedTank");
        setLastUsedTank(null);
        setTimeRemainingTank(null);
    };

    const resetTapingGuruBoosts = () => {
        localStorage.setItem("tapingGuru", initialBoosts);
        setTapingGuruCount(initialBoosts);
        localStorage.removeItem("lastUsedTapingGuru");
        setLastUsedTapingGuru(null);
        setTimeRemainingTapingGuru(null);
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };
   
    return (
        <div>
            {openmodal &&
                <div className="msgmodal">
                    <div className="msgmodal-card">
                        <img src={imgsrc} alt="" width={"120px"}/>
                       <p> {msg}</p>
                        <button onClick={() => { setopenmodal(false) }}>okay</button>
                    </div>
                </div>
            }
            
            <div className="center">
                <div>
                   
                    <CoinsHave coins={coins} />
                </div>
            </div>

            <div className="boosters">
              
                <h4>Your Daily Boosters:</h4>
                <div className="row-boost d-flex" style={{ flexWrap: "wrap" }}>
                    <div
                        className={`boost boost1 ${tapingGuruCount === 0 ? 'disable-boost' : ''}`}
                        onClick={tapingGuruCount > 0 ? () => setIsTapingGuruModalOpen(true) : null}
                    >
                        <img src="coin.png" alt="" width={"30px"} />
                        <div className="boost-name">
                            <p>Taping Guru</p>
                            <p>
                                {tapingGuruCount > 0
                                    ? `${tapingGuruCount}/3`
                                    : `${formatTime(timeRemainingTapingGuru)}`}
                            </p>
                        </div>
                    </div>


                    <div
                        className={`boost boost2 ${tankfillsCount === 0 ? 'disable-boost' : ''}`}
                        onClick={tankfillsCount > 0 ? fillBoost : null}
                    >
                        <img src="coin.png" alt="" width={"30px"} />
                        <div className="boost-name">
                            <p>Full Tank</p>
                            <p>
                                {tankfillsCount > 0
                                    ? `${tankfillsCount}/3`
                                    : `${formatTime(timeRemainingTank)}`}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`boost boost2`}
                        
                    >

                        <div className="boost-name center" style={{ flexDirection: "column", gap: "5px" }}>
                            <p> Guess and Earn 300000</p>


                            <GameModal />

                        </div>
                    </div>


                </div>
            </div>
         
            <h4>&nbsp;&nbsp;&nbsp;&nbsp; Boosters:</h4>
         
            <div className="center">
                <div className="bottom-boosters">


                    {boosters.map(booster => (
                        <div key={booster.id} className="bottom-booster" onClick={() => handleBuyBooster(booster)}>
                            <div className="booster-info">
                                <img src={booster.icon} alt={booster.name} style={{ width: "40px", height: "40px" }} />
                                <div className="single">
                                    <p style={{ "marginBottom": "5px" }}>{booster.name}</p>

                                    <p>{booster.price}
                                        &nbsp;
                                        &nbsp;
                                        {booster.id !== 4 && <span className='level'>| {booster.level} Level</span>}
                                    </p>
                                </div>

                            </div>
                            <div>&gt;</div>
                        </div>
                    ))}

                </div>
            </div>
            {isTapingGuruModalOpen && (
                <div className="modal">
                    <div className="top">
                        <div className="close" onClick={() => setIsTapingGuruModalOpen(false)}>x</div>
                    </div>
                    <div className="center">
                        <div className="fire center">
                            <img src="fire.png" alt="" />
                        </div>
                    </div>
                    <div className="modal-content">
                        <p>Multiply your tap income by x5 for 20 seconds. Do not use energy while active </p>
                        <br />
                        <div className="center">
                            <img src="coin.png" alt="" width={"20px"} />
                            <h3>Free</h3>
                        </div>
                        <br />
                        <br />
                        <button onClick={useTapingGuru}>Get it</button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Boost;
