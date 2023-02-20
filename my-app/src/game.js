import React from 'react';
import './index.css';
import { Board } from './board'
  
export class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        step:0,
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const step = current.step + 1;
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        step: step,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);
    this.setState({
      history: history,
      stepNumber: step, 
      xIsNext: step % 2 === 0,
    })
  }

  reverseHistory() {
    const history = this.state.history.slice();
    const reversedHistory = history.slice(1).reverse();
    const newHistory = [{squares: Array(9).fill(null)}, ...reversedHistory];
    console.log(newHistory);
    this.setState({
      history: history
    })
  }
  

  render() {
    const history = this.state.history;
    const currentStep = this.state.stepNumber
    const current = history[currentStep];
    const moves = history.map((step, move) => {
      const location = calculateLocation(history, step, move);
      const desc = move ?
        `Go to move:${move}, location:${location}` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = currentStep === 9 ? 'Draw!' : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
          {status}
          </div>          
          <ol>{moves}</ol>
          <button className='game-sort' onClick={() => this.reverseHistory()}>Change order!</button>
        </div>
      </div>
    );
  }
}


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

function calculateLocation(history, step, move) {
  if (history[move-1]) {  
    const diff = step.squares.findIndex((item,index) => 
      history[move-1].squares[index] !== item
    ); 
    return location[diff];
  }
}

const location = {
0: '0,0',
1: '0,1',
2: '0,2',
3: '1,0',
4: '1,1',
5: '1,2',
6: '2,0',
7: '2,1',
8: '2,2',
}