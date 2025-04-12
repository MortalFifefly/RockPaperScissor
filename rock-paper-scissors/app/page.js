'use client';

import React, { useRef, useState } from 'react';
import BgMusic from '@/Components/bgMusic'; // Import the background music component

export default function App() {
  const playerScoreRef = useRef(0);
  const computerScoreRef = useRef(0);
  const [result, setResult] = useState('');
  const [computerMove, setComputerMove] = useState(''); // State to track computer's move

  function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
  }

  function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      return "It's a tie!";
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      playerScoreRef.current += 1;
      return "You win! " + playerSelection + " beats " + computerSelection;
    } else {
      computerScoreRef.current += 1;
      return "You lose! " + computerSelection + " beats " + playerSelection;
    }
  }

  const handleClick = (playerSelection, event) => {
    const button = event.target;
    button.classList.add('scale-animation'); // Add animation class
    button.addEventListener('animationend', () => {
      button.classList.remove('scale-animation'); // Remove class after animation ends
    }, { once: true });

    const computerSelection = computerPlay();
    const moveToUnicode = {
      rock: "✊", // Unicode for rock
      paper: "🖐", // Unicode for paper
      scissors: "✌", // Unicode for scissors
    };
    setComputerMove(moveToUnicode[computerSelection]); // Update computer's move with Unicode
    const roundResult = playRound(playerSelection, computerSelection);
    setResult(roundResult);
  };

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors Game</h1>
      <p>Computer's move:</p>
      <div className="computer-move" style={{ fontSize: '4rem', textAlign: 'center' }}>
        {computerMove}
      </div>
      <p>Choose your move:</p>
      <div className="buttons">
        <button onClick={(e) => handleClick("rock", e)} id="rock" style={{ fontSize: '4rem' }}>
          &#x1F44A;
        </button>
        <button onClick={(e) => handleClick("paper", e)} id="paper" style={{ fontSize: '4rem' }}>
          &#x1f590;
        </button>
        <button onClick={(e) => handleClick("scissors", e)} id="scissors" style={{ fontSize: '4rem' }}>
          &#x270c;
        </button>
      </div>
      <p id="result">{result}</p>
      <p id="scores">
        Your score: <span id="user-score">{playerScoreRef.current}</span>
        Computer score: <span id="computer-score">{computerScoreRef.current}</span>
      </p>
      <BgMusic />
    </div>
  );
}
