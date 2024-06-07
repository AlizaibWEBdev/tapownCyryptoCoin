import React from 'react';
import { Link } from 'react-router-dom';


const MissionLink = ({ missionName, reward,link=false,id}) => {
    let compleated  = true;


    return (
  
        <Link target={link&&'_blank'} to={link?link:`/missions/${missionName.toLowerCase().replace(/\s+/g, '-')}`} className='mission center'>
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
            
            <span>{ link && compleated  ? "Compleated" : ">"}</span>
        </Link>
    );
}

const Missions = () => {
    return (
        <div className='mission-wraper'>

            <div>
                <MissionLink missionName="Connect Kross Wallet" reward="100,000" id={"m1"}/>
                <MissionLink missionName="Join TapOwn Channel" reward="150,000" id={"m2"}/>
                <MissionLink missionName="Join Kross Blockchain Community" reward="200,000" id={"m3"}/>
                <MissionLink missionName="Join Hashgreed Community" reward="200,000" id={"m4"}/>
                <MissionLink missionName="Join BUCCON Community" reward="200,000" id={"m5"}/>
                <MissionLink missionName="Follow Kross Blockchain on X" reward="300,000" link={"ttps://x.com/krosscoin_team"}  id={"m6"}/>
                <MissionLink missionName="Follow Hashgreed on X" reward="300,000" link={"https://x.com/hashgreed"} id={"m7"}/>
                <MissionLink missionName="Follow BUCCON on X" reward="300,000" link={"https://x.com/buccon_org"} id={"m8"}/>
                <MissionLink missionName="Follow Kross Blockchain on Facebook" reward="400,000" link={"https://facebook.com/krosscoin"} id={"m9"}/>
                <MissionLink missionName="Subscribe to Krosscoin Youtube Channel" reward="500,000" link={"https://youtube.com/@krosscoinproject6568?si=HfzPAESykCLs4bDk"} id={"m10"}/>
                
            </div>
        </div>
    );
};

export default Missions;
