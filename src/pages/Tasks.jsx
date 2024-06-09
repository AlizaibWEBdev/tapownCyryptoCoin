import React, { useEffect, useState } from 'react';
import Missions from '../components/Missions';
import CoinsHave from "../components/CoinsHave";
import { useApi } from '../../context/ApiContext';
import Leauges from '../components/Leauges';
import RefTask from '../components/RefTask';


const Tasks = () => {
    const [active, setActive] = useState(1);
    
    const api = useApi();
    const [coins, setcoins] = useState(0)
 useEffect(() => {
// get telegram user id then replace ikDoteen with that id 
    api.getUserCoins("ikDoteen").then((e)=>{
        setcoins(e.data.coins)
    })

 }, [])
 
    const changeActive = (tabIndex) => {
        setActive(tabIndex);
    };

    return (
        <div className='center tasks' style={{ flexDirection: "column" }}>
            <br />
            <CoinsHave coins={coins} />
            <br />
            <span className='line-task'></span>
            <br />
            <div className="tasktabs">
                <button className={active === 1 ? "tab-task active" : "tab-task"} onClick={() => changeActive(1)}>Missions</button>
                <button className={active === 2 ? "tab-task active" : "tab-task"} onClick={() => changeActive(2)}>Leagues</button>
                <button className={active === 3 ? "tab-task active" : "tab-task"} onClick={() => changeActive(3)}>Ref Tasks</button>
            </div>
            {active === 1 && <Missions setcoins={setcoins}/>}
            {active === 2 && <Leauges coins={coins} setcoins={setcoins}/>}
            {active === 3 && <RefTask />}
           
        </div>
    );
};

export default Tasks;
