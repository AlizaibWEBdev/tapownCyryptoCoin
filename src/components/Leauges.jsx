import { useState, useEffect } from "react";
import Cliam from "./Cliam";

const Leagues = ({ coins,setcoins }) => {
    const [showClaim, setShowClaim] = useState(false);
    const [claimedTrophies, setClaimedTrophies] = useState(() => {
        const savedTrophies = localStorage.getItem('trophy_rewarded');
        return savedTrophies ? JSON.parse(savedTrophies) : [];
    });
    const [currentTrophy, setCurrentTrophy] = useState(null);

    const claimTrophy = (league) => {
        setShowClaim(true);
        setCurrentTrophy(league);
        const newClaimedTrophies = [...claimedTrophies, { name: league.name, img: league.image }];
        setClaimedTrophies(newClaimedTrophies);
        localStorage.setItem('coins', coins-league.price);
        setcoins(coins-league.price)
        localStorage.setItem('trophy_rewarded', JSON.stringify(newClaimedTrophies));
       
        
    };

    const closePopup = () => {
        setShowClaim(false);
    };

    const leagues = [
        {
            name: "Bronze",
            price: 1000,
            price_to_show: "1 000",
            image: "bronezt.png"
        },
        {
            name: "Silver",
            price: 5000,
            price_to_show: "5 000",
            image: "silvert.png"
        },
        {
            name: "Gold",
            price: 10000,
            price_to_show: "10 000",
            image: "goldt.png"
        }
    ];

    return (
        <div className="leagues">
            {showClaim && currentTrophy && (
                <Cliam text={`You are rewarded with ${currentTrophy.name}`} handelokClick={closePopup} img={currentTrophy.image} />
            )}
            {leagues.map((league, index) => {
                const percentage = Math.min((coins / league.price) * 100, 100);
                const canClaim = coins >= league.price;
                const isClaimed = claimedTrophies.some(trophy => trophy.name === league.name);

                return (
                    <div className={`league ${isClaimed ? 'disabled' : ''}`} key={index}>
                        <div className="row">
                            <div className="left-league d-flex">
                                <img src={league.image} alt="" width={"40px"} />
                                <div className="left-league-heading">
                                    <p>{league.name}</p>
                                    <div className="row-league d-flex">
                                        <img src="coin.png" alt="" width={"20px"} />
                                        <p>{league.price_to_show}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-league">
                                {isClaimed ? (
                                    <button className="_claim_reward claimed" disabled>Claimed</button>
                                ) : (
                                    canClaim ? (
                                        <button className="_claim_reward enabled" onClick={() => claimTrophy(league)}>Claim</button>
                                    ) : (
                                        <button className="_claim_reward disabled" disabled>Claim</button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="percentage">
                            <div className="completed" style={{ width: `${percentage}%` }}></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Leagues;
