import React, { useState } from 'react'

const RefTask = () => {
    const [text, settext] = useState("Copy")
    const copy = ()=>{
        settext("copied");
        setTimeout(() => {
            settext("Copy")
        }, 4000);
    }
    return (
        <>
            <div className="inviteLink d-flex">

                <div className="link d-flex">
                <h3>invite link</h3>
                <button className='copy' onClick={copy}>{text}</button>
                </div>
                <p>t.me/tapown/121094857</p>
                    
            </div>
            <div className="leauges">
                <div className="league">
                    <div className="row">
                        <div className="left-league d-flex">
                            <img src="cat.png" alt="" width={"40px"} />
                            <div className="left-league-hading">
                                <p>Invite 1 Friend</p>
                                <div className="row-league d-flex">
                                    <img src="coin.png" alt="" width={"20px"} />
                                    <p>2 500</p>
                                </div>
                            </div>
                        </div>
                        <div className="right-league">
                            {/* {(coins / 1000 * 100) == 100 ? <button className="_claim_reward enaibled">Claim</button> : <button className="_claim_reward disaibled">Claim</button>} */}
                            <button className="_claim_reward disaibled">Claim</button>

                        </div>
                    </div>
                    <div className="persentage">
                        <div className="compleated" style={{ width: "0%" }}></div>
                    </div>

                </div>

                <div className="league">
                    <div className="row">
                        <div className="left-league d-flex">
                            <img src="cat.png" alt="" width={"40px"} />
                            <div className="left-league-hading">
                                <p>Invite 3 Friend</p>
                                <div className="row-league d-flex">
                                    <img src="coin.png" alt="" width={"20px"} />
                                    <p>50 000</p>
                                </div>
                            </div>
                        </div>
                        <div className="right-league">
                            {/* {(coins / 1000 * 100) == 100 ? <button className="_claim_reward enaibled">Claim</button> : <button className="_claim_reward disaibled">Claim</button>} */}
                            <button className="_claim_reward disaibled">Claim</button>

                        </div>
                    </div>
                    <div className="persentage">
                        <div className="compleated" style={{ width: "0%" }}></div>
                    </div>

                </div>

                <div className="league">
                    <div className="row">
                        <div className="left-league d-flex">
                            <img src="cat.png" alt="" width={"40px"} />
                            <div className="left-league-hading">
                                <p>Invite 10 Friend</p>
                                <div className="row-league d-flex">
                                    <img src="coin.png" alt="" width={"20px"} />
                                    <p>200 000</p>
                                </div>
                            </div>
                        </div>
                        <div className="right-league">
                            {/* {(coins / 1000 * 100) == 100 ? <button className="_claim_reward enaibled">Claim</button> : <button className="_claim_reward disaibled">Claim</button>} */}
                            <button className="_claim_reward disaibled">Claim</button>

                        </div>
                    </div>
                    <div className="persentage">
                        <div className="compleated" style={{ width: "0%" }}></div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default RefTask