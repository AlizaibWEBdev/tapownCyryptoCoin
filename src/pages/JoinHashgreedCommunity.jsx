

import React, { useState,useEffect } from 'react'
import { useApi } from '../../context/ApiContext';
import Cliam from '../components/Cliam';

const JoinHashgreedCommunity = () => {
    const api = useApi();
    const missionID = window.location.href.split("?")[1].replace("id=", "")
    const reward = window.location.href.split("&")[1].replace("reward=","")
    const [compleated, setCompleated] = useState(false);
    const [claimed, setclaimed] = useState(false);
    const [showclaimPopup, setshowclaimPopup] = useState(false);

    
    const handelokClick = ()=>{
        
        setshowclaimPopup(false)
    }
    useEffect(() => {
        const check = async () => {
            const result = await api.isMissionCompleted("userid", missionID);
            setCompleated(result == "0" ? false : true)

            const result2 = await api.isRewardClaimed("userid", missionID);
            setclaimed(result2 == "0" ? false : true)
        }

        check();
    }, [])


  return (
    <div>
            <div className='task-steps-tab'>
            <h2>Join Hashgreed Community
            </h2>
            <br />
            <div className="reward-to-compleate">
                <div className="coin-image">
                    <img src="../coin.png" alt="" />
                </div>
                <div className="reward-col">
                    <p>Reward</p>
                    <p><b>{reward}</b></p>
                </div>
            </div>
            <br />
            {!compleated && <>
                <h2>Steps to follow </h2>
                <br />
                <div className="steps-list">
                    <ol>
                        <li>
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">Go to link and join<a href="https://t.me/hashgreedroyals" target="_blank" rel="noopener noreferrer" onClick={async (e) => {
                                    e.preventDefault();

                                    await api.markMissionCompleted("userid", missionID);
                                    setCompleated(true);
                                   
                                    window.open(e.target.href, '_blank');
                                  

                                }}>t.me/krosscoinbot</a></div>
                            </div>
                        </li>
                       
                    </ol>
                   
                </div>
            </>}
            {compleated && !claimed && <div className='center'><button className='claim-reward' onClick={async () => {

let oldcoins = await api.getUserCoins("somthing");
oldcoins = oldcoins.data.coins;
const amountToadd = parseInt(reward.replace(",", "").replace(" ", ""))
await api.updateUserCoins("somthing", oldcoins + amountToadd)
await api.markMissionCompleted("somthing", missionID);
await api.markRewardClaimed("somthing", missionID);

setclaimed(true);
setCompleated(true);
setshowclaimPopup(amountToadd);

}}>Claim Reward</button></div>}
{compleated && claimed && <div className='center'><button className='claim-rewarded' >Reward Claimed</button></div>}
{showclaimPopup && <Cliam amount={reward} handelokClick={handelokClick} />}
            
        </div>
    </div>
  )
}

export default JoinHashgreedCommunity