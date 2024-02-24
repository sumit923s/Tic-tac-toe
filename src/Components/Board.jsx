import React, { useState } from 'react';
import Square from './Square.jsx';
import './../App.css';
import { useEffect } from 'react';
export default function Board({ xIsNext, squares, onPlay }) {
  const [Win, isWin] = useState(false);
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    isWin(true);
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

 useEffect(() => {

 }, Win);
  ///Modification no 2
const squareRendering = (i) => {
    return (
      <Square
      value={squares[i]}
      onSquareClick={() => handleClick(i)}
      className={Win?"winner":null} // 3rd MODIFICATION
    />
    );
  };
 
  const squareBoardRow = () => {
    let k = 0;
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push( 
        <div className="board-row" key={i}>
          {[0, 1, 2].map((arg) => {
            return squareRendering(arg + k);
          })}
        </div>
      );
      k =k+3;
    }
    return rows; 
  };
  
  return (
    <>
    <div className="status">{status}</div>
      {squareBoardRow()}
    </>
  );
 
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
}
