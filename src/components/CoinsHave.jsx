import React from 'react'

const CoinsHave = ({ coins }) => {
    return (
        <div className="coins d-flex">
            <img src="coin.png" alt="" width={"35px"} />
            <h1>{coins}</h1>
        </div>
    )
}

export default CoinsHave