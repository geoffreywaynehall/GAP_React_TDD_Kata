import '../Style/gameBoard.css';
import React, { Component } from "react";

function Square(props) {
    let addClasses = [];
    const vert = [1,4,7];
    const hor = [3,4,5];
    if (vert.includes(props.num)) {
        addClasses.push("vertical");
    }
    if (hor.includes(props.num)) {
        addClasses.push("horizontal");
    }
    return (
        <td id={"square-" + props.num} onClick={props.onClick} className={props.fill + ' ' + addClasses.join(' ')}>{props.fill}</td>
    );
}

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            previousSquares: [],
            squares: ['','','','','','','','',''],
            turn: 'X',
            win: ''
        };
    }

    checkForWin(squares) {
        if (!this.checkVertical(squares)) {
            if (!this.checkHorizontal(squares)) {
                this.checkDiagonal(squares);
            }
        }
    }

    checkVertical(squares) {
        if (squares[0] === squares[3] && squares[3] === squares[6]) {
            this.setState({
                win: squares[0]
            });
            return true;
        } else if (squares[1] === squares[4] && squares[4] === squares[7]) {
            this.setState({
                win: squares[1]
            });
            return true;
        } else if (squares[2] === squares[5] && squares[5] === squares[8]) {
            this.setState({
                win: squares[2]
            });
            return true;
        }
        return false;
    }

    checkHorizontal(squares) {
        if (squares[0] === squares[1] && squares[1] === squares[2]) {
            this.setState({
                win: squares[0]
            });
            return true;
        } else if (squares[3] === squares[4] && squares[4] === squares[5]) {
            this.setState({
                win: squares[3]
            });
            return true;
        } else if (squares[6] === squares[7] && squares[7] === squares[8]) {
            this.setState({
                win: squares[6]
            });
            return true;
        }
        return false;
    }

    checkDiagonal(squares) {
        if (squares[0] === squares[4] && squares[4] === squares[8]) {
            this.setState({
                win: squares[0]
            });
        } else if (squares[2] === squares[4] && squares[4] === squares[6]) {
            this.setState({
                win: squares[2]
            });
        } else {
            if (!squares.includes('') && this.state.win === '') {
                this.setState({
                    win: 'TIE'
                });
            }
        }
    }

    move(squareNum: Number) {
        if (this.state.squares[squareNum] === '' && this.state.win === '') {
            let oldSquares = this.state.previousSquares;
            oldSquares.push(this.state.squares);
            let newSquares = this.state.squares.slice();
            newSquares[squareNum] = this.state.turn;
            this.setState({
                previousSquares: oldSquares,
                squares: newSquares,
                turn: this.state.turn === 'X' ? 'O' : 'X'
            });
            this.checkForWin(newSquares);
        }
    }

    reset() {
        this.setState({
            previousSquares: [],
            squares: ['', '', '', '', '', '', '', '', ''],
            turn: 'X',
            win: ''
        });
    }

    undo() {
        let previousSquares = this.state.previousSquares;
        let squares = previousSquares.pop();
        this.setState({
            previousSquares: previousSquares,
            squares: squares,
            turn: this.state.turn === 'X' ? 'O' : 'X',
            win: ''
        });
    }

    renderSquare(squareNum) {
        return (
            <Square key={squareNum} num={squareNum} onClick={() => this.move(squareNum)} fill={this.state.squares[squareNum]} />
        );
    }

    render() {
        let rows = [];
        for (var row = 0; row < 3; row++) {
            let squares = []
            for (var col = 0; col < 3; col++) {
                squares.push(this.renderSquare((row*3)+col));
            }
            rows.push(<tr key={row-1}>{ squares }</tr >);
        }

        return (
            <div className="GameBoard">
                <table>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
                {this.state.win === '' ? <h2 className="turn-tracker">It is <span className={this.state.turn}>{this.state.turn}</span>'s turn to go!</h2> : this.state.win === 'TIE' ? <h2 className="turn-tracker">TIE!</h2> : <h2 className="turn-tracker"><span className={this.state.win}>{this.state.win}</span> WINS!</h2> }
                <div className='controls'>
                    {this.state.previousSquares.length > 0 ? <button id="undo-button" onClick={() => this.undo()}>Undo</button> : null}
                    {this.state.previousSquares.length > 0 ? <button id="reset-button" onClick={() => this.reset()}>Reset</button> : null}
                </div>
            </div>
        );
    }
}

export default GameBoard;