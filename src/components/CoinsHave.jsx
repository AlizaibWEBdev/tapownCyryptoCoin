import React, { useEffect, useState } from 'react'

const CoinsHave = ({ coins }) => {
    const [img, setimg] = useState('');
    const [txt, setTxt] = useState('');

    useEffect(() => {
        let tropy = JSON.parse(localStorage.getItem("trophy_rewarded"))
      if (tropy) {
        tropy = tropy[tropy?.length - 1 || 0];
        setTxt(tropy.name)
        setimg(tropy.img)
      }
    }, [coins])

    return (
        <div className="coins d-flex" style={{ flexDirection: "column" }}>
            <div className="single d-flex center">
                <img src="coin.png" alt="" width={"30px"} />
                <h1>{coins}</h1>
            </div>
            <div className="row center" >
                <img src={img} alt="" width={"30px"} />
                <p>{txt}</p>
            </div>
        </div>
    )
}

export default CoinsHave