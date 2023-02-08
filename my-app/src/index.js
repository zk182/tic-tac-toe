import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square (props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xNext: true,
            movements: 0,
            winner: null,
        }
    }
    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClick={()=> this.handleClick(i)}/>;
    }

    handleClick(i) {
        const { xNext, winner, movements } = this.state;
        const squares = this.state.squares.slice();
        if (winner || squares[i]) {
          return;
        }
        const newValue = xNext ? 'X' : 'O'
        squares[i]= newValue;
        const newMovements = movements + 1;
        const newWinner = newMovements >= 5 ? calculateWinner(squares) : null;
        this.setState({squares, xNext: !this.state.xNext, movements: newMovements,  winner: newWinner });
    };
  
    render() {
      const status = this.state.winner ? `Winner: ${this.state.winner}!` : this.state.movements < 9 ? `Next player: ${this.state.xNext ? 'X' : 'O'}` : 'Game ended';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  