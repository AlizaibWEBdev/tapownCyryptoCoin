import React, { useState } from 'react'

const JoinTapOwnChannel = () => {
    const [compleated, setCompleated] = useState(false);
    const [claimed, setclaimed] = useState(false);
    return (
        <div className='task-steps-tab'>
            <h2>Join TapOwn Channel
            </h2>
            <br />
            <div className="reward-to-compleate">
                <div className="coin-image">
                    <img src="../coin.png" alt="" />
                </div>
                <div className="reward-col">
                    <p>Reward</p>
                    <p><b>150 000</b></p>
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
                                <div className="step-content">Go to link and join : <a href="https://t.me/tapownai" target="_blank" rel="noopener noreferrer">t.me/krosscoinbot</a></div>
                            </div>
                        </li>
                    </ol>
                </div>
            </>}
            {compleated && <div className='center'>
                <h1>task Compleated!!</h1>

            </div>}
            <br />
            {compleated && !claimed && <div className='center'><button className='claim-reward'>Claim Reward</button></div>}
            {compleated && claimed && <div className='center'><button className='claim-rewarded'>Reward Claimed</button></div>}
        </div>
    )
}

export default JoinTapOwnChannel