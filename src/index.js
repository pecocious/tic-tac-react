import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill({
          class: 'square',
          value: null,
        }),
        currentMove: null
      }],
      stepNumber: 0,
      xIsNext: true,
      allowNextMove: true
    }
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill({
          class: 'square',
          value: null
        }),
        currentMove: null
      }],
      stepNumber: 0,
      xIsNext: true,
      allowNextMove: true
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const previousSquare = current.currentMove != null? {...squares[current.currentMove]} : null;
    const square = {...squares[i]};
    const allowNextMove = this.state.allowNextMove;
    if (!allowNextMove || calculateWinner(squares) || squares[i].value) {
      return;
    }

    if(current.currentMove != null){
       previousSquare.class = 'square';
       squares[current.currentMove] = previousSquare;
    }

    square.value = this.state.xIsNext? 'X': 'O';
    square.class = 'square-red';
    squares[i] = square;

    this.setState({
      history: history.concat([{
        squares: squares,
        currentMove: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      allowNextMove: this.state.history.length - 1 === step
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move # ${move}`:
        `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if(winner){
      status = `Winner ${winner}`
    }else{
      status = history.length === 10? 'Draw' : this.state.allowNextMove ? 'Next player: ' + (this.state.xIsNext? 'X': 'O') : 'History: viewing step number: ' + this.state.stepNumber;
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
          <button className="new-game"
            onClick={() => this.resetGame()}
          >New Game</button>
          <div className="status">{status}</div>
          <ol>{moves}</ol>

        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value){
      return squares[a].value;
    }
  }

  return null;
}
