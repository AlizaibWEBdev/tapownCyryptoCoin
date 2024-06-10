import React, { useState, useEffect, useRef } from 'react'
import { useApi } from '../../context/ApiContext';
import Cliam from '../components/Cliam';
import { Link } from 'react-router-dom';

const MissionLink = ({ missionName, reward, link = false, id, setcoins = () => { } }) => {
    const api = useApi();
    const [compleated, setCompleated] = useState(false);
    const [claimed, setclaimed] = useState(false);
    const [showclaimPopup, setshowclaimPopup] = useState(false);
   
    const handelokClick = () => {
        api.getUserCoins("ikDoteen").then((e) => {
            setcoins(e.data.coins);
            setshowclaimPopup(false);
        })
    }
    useEffect(() => {

        const check = async () => {
            const result = await api.isMissionCompleted("userid", id);
            setCompleated(result == "0" ? false : true)

            const result2 = await api.isRewardClaimed("userid", id);
            setclaimed(result2 == "0" ? false : true)
        }

        check();
    }, [])
    return link ? (
        <div  className='mission center' style={{flexDirection:"column"}}>
            <a  style={{textDecoration:"underline",alignSelf:"start"}}  target='_blank' onClick={async (e) => {
                if (link) {
                    e.preventDefault();
                    await api.markMissionCompleted("userid", missionName);
                    setCompleated(true);

                    window.open(link, '_blank');

                }
            }}

            >{missionName}</a>
        <div className="d-flex bottom-actions">
        <div className="single-side center">
                <img src="task.png" alt="" />
                <div className="col">

                    <div className="reward">
                        <img src="coin.png" alt="" />
                        <b>{reward}</b>
                    </div>
                </div>
            </div>
            {!compleated && <span>{">"}</span>}
            {compleated && !claimed && <button onClick={async (e) => {
                e.preventDefault();

                let oldcoins = await api.getUserCoins("somthing");
                oldcoins = oldcoins.data.coins;
                const amountToadd = parseInt(reward.replace(",", "").replace(" ", ""))
                await api.updateUserCoins("somthing", oldcoins + amountToadd)
                await api.markMissionCompleted("somthing", id);
                await api.markRewardClaimed("somthing", id);

                setclaimed(true);
                setCompleated(true);
                setshowclaimPopup(amountToadd);
            }} className='claim--'>claim reward</button>}
            {compleated && claimed && <span className='claim-lable'>{"claimed"}</span>}

            {showclaimPopup && <Cliam amount={reward} handelokClick={handelokClick} />}
        </div>
        </div>
        ) : (
        <Link target={link ? '_blank' : undefined} to={link ? link : `/missions/${missionName.toLowerCase().replace(/\s+/g, '-')}?id=${id}&reward=${reward}`} className='mission center' onClick={async (e) => {
            if (link) {
                e.preventDefault();
                await api.markMissionCompleted("userid", missionName);
                setCompleated(true);

                window.open(e.target.href, '_blank');

            }
        }}>
            <div className="single-side">
                <img src="task.png" alt="" />
                <div className="col">
                    <p>{missionName}</p>
                    <div className="reward">
                        <img src="coin.png" alt="" />
                        <b>{reward}</b>
                    </div>
                </div>
            </div>
            <span>{">"}</span>
            {compleated && !claimed && <button onClick={async (e) => {
                e.preventDefault();

                let oldcoins = await api.getUserCoins("somthing");
                oldcoins = oldcoins.data.coins;
                const amountToadd = parseInt(reward.replace(",", "").replace(" ", ""))
                await api.updateUserCoins("somthing", oldcoins + amountToadd)
                await api.markMissionCompleted("somthing", id);
                await api.markRewardClaimed("somthing", id);
                setclaimed(true);
                setCompleated(true);
                setshowclaimPopup(amountToadd);
            }} className='claim--'>claim reward</button>}
            {compleated && claimed && <span className='claim-lable'>{"Claimed"}</span>}
            {showclaimPopup && <Cliam amount={reward} handelokClick={handelokClick} />}
        </Link>
    )
}
const Missions = ({ setcoins }) => {
    const [Arrvisible, setArrvisible] = useState(false)
    return (
        <div className='mission-wraper' id='mission-wr' onScroll={(e)=>{
           if (e.target.scrollTop > 100) {
            setArrvisible(true)
           }
           if (e.target.scrollTop < 100) {
            setArrvisible(false)
           }
           
        }} >
            {Arrvisible&& 
            
            <div className="center">
           <button className="scrolltop" onClick={()=>{
            document.getElementById("mission-wr").scroll(0,0)
           }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" ><path fill="currentColor" fillRule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clipRule="evenodd"></path></svg>
            </button>
           </div>

            } 
           
            <div>
                <MissionLink missionName="Connect Kross Wallet" reward="100,000" id={"m1"} />
                <MissionLink missionName="Join TapOwn Channel" reward="150,000" id={"m2"} />
                <MissionLink missionName="Join Kross Blockchain Community" reward="200,000" id={"m3"} />
                <MissionLink missionName="Join Hashgreed Community" reward="200,000" id={"m4"} />
                <MissionLink missionName="Join BUCCON Community" reward="200,000" id={"m5"} />
                <MissionLink missionName="Follow Kross Blockchain on X" reward="300,000" link={"ttps://x.com/krosscoin_team"} id={"m6"} setcoins={setcoins} />
                <MissionLink missionName="Follow Hashgreed on X" reward="300,000" link={"https://x.com/hashgreed"} id={"m7"} setcoins={setcoins} />
                <MissionLink missionName="Follow BUCCON on X" reward="300,000" link={"https://x.com/buccon_org"} id={"m8"} setcoins={setcoins} />
                <MissionLink missionName="Follow Kross Blockchain on Facebook" reward="400,000" link={"https://facebook.com/krosscoin"} id={"m9"} setcoins={setcoins} />
                <MissionLink missionName="Subscribe to Krosscoin Youtube Channel" reward="500,000" link={"https://youtube.com/@krosscoinproject6568?si=HfzPAESykCLs4bDk"} id={"m10"} setcoins={setcoins} />
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};
export default Missions;
