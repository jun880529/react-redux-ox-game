import React from 'react'
import { connect } from 'react-redux'
import Board from './Board'
import Status from './Status'
import ResetButton from './ResetButton'
import {
  initializePlayerAction,
  initializeSquareAction,
  addSquareAction,
  changePlayerAction,
} from '../actions/index'
import calculateWinner from '../calculateWinner'

const mapStateToProps = ({ squares, currentPlayer }) => ({
  squares,
  currentPlayer,
})

const mapDispatchToProps = dispatch => ({
  initSquare: () => dispatch(initializeSquareAction()),
  initPlayer: () => dispatch(initializePlayerAction()),
  addSquare: (index, symbol) => dispatch(addSquareAction(index, symbol)),
  changePlayer: currentPlayer => dispatch(changePlayerAction(currentPlayer)),
})

class GameP extends React.Component {
  componentDidMount() {
    this.props.initSquare()
    this.props.initPlayer()
    //console.log(this.props,'test props')
  }

  handleClick(i) {
    const { squares, currentPlayer, addSquare, changePlayer } = this.props

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    addSquare(i, currentPlayer)
    changePlayer(currentPlayer)
  }

  render() {
    const { squares, currentPlayer, initPlayer, initSquare } = this.props
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <Status
            squares={squares}
            currentPlayer={currentPlayer}
          />
        </div>
        <ResetButton
          initPlayer={initPlayer}
          initSquare={initSquare}
        />
      </div>
    )
  }
}

const Game = connect(mapStateToProps, mapDispatchToProps)(GameP)

GameP.propTypes = {
  squares: React.PropTypes.array.isRequired,
  currentPlayer: React.PropTypes.string.isRequired,
  initSquare: React.PropTypes.func.isRequired,
  initPlayer: React.PropTypes.func.isRequired,
  addSquare: React.PropTypes.func.isRequired,
  changePlayer: React.PropTypes.func.isRequired,
}

export default Game
