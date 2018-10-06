import React from 'react';
import Square from './square';

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square
      data={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(gridNumber => this.renderSquare(gridNumber))}
        </div>
      </div>
    );
  }
}

export default Board;
