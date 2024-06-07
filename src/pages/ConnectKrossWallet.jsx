import React, { useState } from 'react'

const ConnectKrossWallet = () => {
    
    const [compleated, setCompleated] = useState(false);
    const [claimed, setclaimed] = useState(true);

    return (
        <div className='task-steps-tab'>
            <h2>Connect kross wallet
            </h2>
            <br />
            <div className="reward-to-compleate">
                <div className="coin-image">
                    <img src="../coin.png" alt="" />
                </div>
                <div className="reward-col">
                    <p>Reward</p>
                    <p><b>100 000</b></p>
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
                                <div className="step-content">Go to <a href="https://t.me/krosscoinbot" target="_blank" rel="noopener noreferrer">t.me/krosscoinbot</a></div>
                            </div>
                        </li>
                        <li>
                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">Tap on 'Start' to see the welcome message</div>
                            </div>
                        </li>
                        <li>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">Enter the command <code>/myaddress</code> and send it to the bot. This registers your Telegram username with the Kross Shield bot.</div>
                            </div>
                        </li>
                        <li>
                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">Enter <code>/help</code> to see the other bot functions</div>
                            </div>
                        </li>
                    </ol>
                    <p className="completion-note">
                        Completing the first 3 steps connects your username with a Kross wallet address. We will send your RWA tokens and other token airdrops to this address.
                    </p>
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

export default ConnectKrossWallet