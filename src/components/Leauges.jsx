

const Leauges = ({ coins }) => {






    return (
        <div className="leauges">
            <div className="league">
                <div className="row">
                    <div className="left-league d-flex">
                        <img src="bronezt.png" alt="" width={"40px"} />
                        <div className="left-league-hading">
                            <p>Bronze</p>
                            <div className="row-league d-flex">
                                <img src="coin.png" alt="" width={"20px"} />
                                <p>1 000</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-league">
                        {(coins / 1000 * 100) == 100 ? <button className="_claim_reward enaibled">Claim</button> : <button className="_claim_reward disaibled">Claim</button>}

                    </div>
                </div>
                <div className="persentage">
                    <div className="compleated" style={{ width: coins / 1000 * 100 + "%" }}></div>
                </div>

            </div>

            <div className="league">
                <div className="row">
                    <div className="left-league d-flex">
                        <img src="silvert.png" alt="" width={"40px"} />
                        <div className="left-league-hading">
                            <p>Silver</p>
                            <div className="row-league d-flex">
                                <img src="coin.png" alt="" width={"20px"} />
                                <p>5 000</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-league">
                        {(coins / 5000 * 100) == 100 ? <button className="_claim_reward enaibled">Claim</button> : <button className="_claim_reward disaibled">Claim</button>}

                    </div>
                </div>
                <div className="persentage">
                    <div className="compleated" style={{ width: coins / 5000 * 100 + "%" }}></div>
                </div>

            </div>


            <div className="league">
                <div className="row">
                    <div className="left-league d-flex">
                        <img src="silvert.png" alt="" width={"40px"} />
                        <div className="left-league-hading">
                            <p>Gold</p>
                            <div className="row-league d-flex">
                                <img src="coin.png" alt="" width={"20px"} />
                                <p>10 000</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-league">
                        {(coins / 10000 * 100) == 100 ? <button className="_claim_reward enaibled">Claim</button> : <button className="_claim_reward disaibled">Claim</button>}

                    </div>
                </div>
                <div className="persentage">
                    <div className="compleated" style={{ width: coins / 10000 * 100 + "%" }}></div>
                </div>

            </div>

      
        </div>
    )
}

export default Leauges