import React from 'react';

const PlusOne = ({ x, y,CoinsSpeed }) => {
    const style = {
        left: x,
        top: y,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        animation: 'moveUp 1s forwards, fadeOut 1s forwards',
    };

    return <div className="plus-one" style={style}>+ {CoinsSpeed}</div>;
};

export default PlusOne;
