import React from 'react';
import { Square } from './square';
export class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]} isWinner={this.props.winners ? this.props.winners.includes(i) : false} onClick={()=> this.props.onClick(i)}/>;
    }
  
    render() {
      const rows = [];
      for (let i=0; i<=8; i = i+3) {
        let squares = [];
        for (let j=0; j<3; j++) {
          squares.push( this.renderSquare(i + j) );  
        }
        rows.push(<div className="board-row" key={i}> {squares} </div>);
      }
      return (
        <div>
         {rows}
        </div>
      );
    }
  }