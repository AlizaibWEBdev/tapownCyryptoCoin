// src/components/GameModal.js

import React, { useState, useEffect } from 'react';


const NumberGuessingGame = ({ resetGame }) => {
    const [targetNumber, setTargetNumber] = useState(() => {
        const savedGame = JSON.parse(localStorage.getItem('gameState'));
        return savedGame ? savedGame.targetNumber : Math.floor(Math.random() * 101);
    });
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(() => {
        const savedGame = JSON.parse(localStorage.getItem('gameState'));
        return savedGame ? savedGame.attempts : 3;
    });

    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify({ targetNumber, attempts }));
    }, [targetNumber, attempts]);

    const handleGuessChange = (e) => {
        setGuess(e.target.value);
    };

    const handleGuessSubmit = () => {
        const guessNumber = parseInt(guess);
        if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 100) {
            setMessage('Please enter a number between 0 and 100.');
            return;
        }

      

        if (guessNumber === targetNumber) {
            setMessage('Congratulations! You guessed the correct number.');
        } else if (attempts - 1 === 0) {
            setMessage(`Game Over! The correct number was ${targetNumber}.`);
        } else if (guessNumber > targetNumber) {
            setMessage('Too high! Try again.');
        } else {
            setMessage('Too low! Try again.');
        }
        setAttempts(attempts - 1);
        setGuess('');
    };

    return (
        <div className="number-guessing-game">
            <h1>Number Guessing Game</h1>
            <p>Guess a number between 0 and 100. You have {attempts} attempts left.</p>
            <input
                
                value={guess}
                onChange={handleGuessChange}
                disabled={attempts === 0}
            />
            <button onClick={handleGuessSubmit} disabled={attempts === 0}>
                Guess
            </button>
            <p>{message}</p>
        </div>
    );
};

const GameModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);
    const [rerun, setrerun] = useState(false)
    useEffect(() => {
        const lastPlayTime = localStorage.getItem('lastPlayTime');
        if (lastPlayTime) {
            const timePassed = Date.now() - new Date(lastPlayTime).getTime();
            const oneDay = 24 * 60 * 60 * 1000;

            if (timePassed < oneDay) {
                setTimeLeft(oneDay - timePassed);
            } else {
                localStorage.removeItem('lastPlayTime');
                localStorage.removeItem('gameState');
            }
        }
    }, [isModalOpen,setIsModalOpen,rerun]);

    useEffect(() => {
        let timer;
        if (timeLeft) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1000) {
                        clearInterval(timer);
                        localStorage.removeItem('lastPlayTime');
                        localStorage.removeItem('gameState');
                        return null;
                    }
                    return prev - 1000;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}H ${minutes}M ${seconds}S`;
    };

    const openModal = () => {
        setrerun("chnage")
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setrerun(true);
        setShowInstructions(true);

    };

    const startGame = () => {
        setShowInstructions(false);
       try {
        let attempts =     JSON.parse(localStorage.gameState);
        if (attempts.attempts < 1) {
            localStorage.setItem('lastPlayTime', new Date().toISOString());
        }
       } catch (error) {
        console.log(error);
       }
    };

    const resetGame = () => {
        setShowInstructions(true);
    };

    return (
        <div>
            {timeLeft ? (
                <button className="time-left-button">{formatTime(timeLeft)}</button>
            ) : (
                <button onClick={openModal} className="play-button">Play Game</button>
            )}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {showInstructions ? (
                            <div className="instructions">
                                <br />
                                <br />
                                <p>Guess a number between 0 and 100. and win 300000 coins </p>
                                <button onClick={startGame} className="start-game-button">Start Game</button>
                                <br />
                            </div>
                        ) : (
                            <NumberGuessingGame resetGame={resetGame} />
                        )}
                        <span onClick={closeModal} className="close-modal-button">&times;</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameModal;
