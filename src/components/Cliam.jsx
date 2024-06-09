import React from 'react'

 const Cliam = ({amount="",handelokClick,text="",img=""}) => {
    console.log(img);
    return (
        <div className="claimContainer">
            <div className="claim">

                <br />
                <div className="center" style={{ flexDirection: "column" }}>
                  
                    <img src={img.length>5 ? "../" + img : "../coin.png"} alt="" width={"180px"} />

                    <p>{amount} {text.length>3?text: " coin has been added"}</p>

                    <div className="close" onClick={handelokClick}>ok</div>
                </div>
            </div>
        </div>
    )
}
export default Cliam
