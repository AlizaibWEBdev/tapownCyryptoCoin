import React from 'react';

const Stats = () => {
    return <div className='center stats' style={{ flexDirection: "column" }}>
        <br />
        <br />


        <span>Total shere Ballance</span>
        <div className="center">
            <img src="coin.png" alt="" width={"30px"} />
            <h1>
                2912.560 T
            </h1>

        </div>   
        <br />

<span>total touches:</span>
 
<p> 2 308 </p>
         <br />

        <span>total players:</span>
 
        <p> 230</p>
        <br />
        <span>Daily Users </span>
 
        <p> 50</p>
        <br />
        <span>online players </span>
 
        <p> 10</p>
    </div>;
};

export default Stats;
