import React, { useEffect, useState } from 'react';

const CoinsHave = ({ coins }) => {
    const [img, setImg] = useState('');
    const [txt, setTxt] = useState('');
    const [tokens, setTokens] = useState(coins);

    useEffect(() => {
        setTokens(coins);
    }, [coins]);

    useEffect(() => {
        const trophy = JSON.parse(localStorage.getItem("trophy_rewarded"));
        if (trophy!==null && trophy!==undefined) {
            const lastTrophy  = trophy[trophy?.length - 1 || 0];
            setTxt(lastTrophy.name);
            setImg(lastTrophy.img);
        }

        const bot = localStorage.getItem("tap_bot");
        let intervalId;
        if (bot && bot === "purchased") {
            intervalId = setInterval(() => {
                setTokens((prevTokens) => {
                    const newTokens = prevTokens + 60;
                    localStorage.setItem("coins", newTokens);
                    return newTokens;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return (
        <div className="coins d-flex" style={{ flexDirection: "column" }}>
            <div className="single d-flex center">
                <img src="coin.png" alt="coin" width="30px" />
                <h1>{tokens}</h1>
            </div>
           {img.length > 3 && txt.length>3 &&   <div className="row center">
                <img src={img} alt="trophy" width="30px" />
                <p>{txt}</p>
            </div>}
        </div>
    );
};

export default CoinsHave;
