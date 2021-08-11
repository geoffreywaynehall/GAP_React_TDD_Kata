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
            previousTiles: [],
            tiles: ['','','','','','','','',''],
            turn: 'X',
            win: ''
        };
    }

    checkForWin(tiles) {
        if (!this.checkVertical(tiles)) {
            if (!this.checkHorizontal(tiles)) {
                this.checkDiagonal(tiles);
            }
        }
    }

    checkVertical(tiles) {
        if (tiles[0] === tiles[3] && tiles[3] === tiles[6]) {
            this.setState({
                win: tiles[0]
            });
            return true;
        } else if (tiles[1] === tiles[4] && tiles[4] === tiles[7]) {
            this.setState({
                win: tiles[1]
            });
            return true;
        } else if (tiles[2] === tiles[5] && tiles[5] === tiles[8]) {
            this.setState({
                win: tiles[2]
            });
            return true;
        }
        return false;
    }

    checkHorizontal(tiles) {
        if (tiles[0] === tiles[1] && tiles[1] === tiles[2]) {
            this.setState({
                win: tiles[0]
            });
            return true;
        } else if (tiles[3] === tiles[4] && tiles[4] === tiles[5]) {
            this.setState({
                win: tiles[3]
            });
            return true;
        } else if (tiles[6] === tiles[7] && tiles[7] === tiles[8]) {
            this.setState({
                win: tiles[6]
            });
            return true;
        }
        return false;
    }

    checkDiagonal(tiles) {
        if (tiles[0] === tiles[4] && tiles[4] === tiles[8]) {
            this.setState({
                win: tiles[0]
            });
        } else if (tiles[2] === tiles[4] && tiles[4] === tiles[6]) {
            this.setState({
                win: tiles[2]
            });
        } else {
            if (!tiles.includes('') && this.state.win === '') {
                this.setState({
                    win: 'TIE'
                });
            }
        }
    }

    move(square: Number) {
        if (this.state.tiles[square] === '' && this.state.win === '') {
            let oldTiles = this.state.previousTiles;
            oldTiles.push(this.state.tiles);
            let newTiles = this.state.tiles.slice();
            newTiles[square] = this.state.turn;
            this.setState({
                previousTiles: oldTiles,
                tiles: newTiles,
                turn: this.state.turn === 'X' ? 'O' : 'X'
            });
            this.checkForWin(newTiles);
        }
    }

    reset() {
        this.setState({
            previousTiles: [],
            tiles: ['', '', '', '', '', '', '', '', ''],
            turn: 'X',
            win: ''
        });
    }

    undo() {
        let previousTiles = this.state.previousTiles;
        let tiles = previousTiles.pop();
        this.setState({
            previousTiles: previousTiles,
            tiles: tiles,
            turn: this.state.turn === 'X' ? 'O' : 'X',
            win: ''
        });
    }

    renderSquare(squareNum) {
        return (
            <Square key={squareNum} num={squareNum} onClick={() => this.move(squareNum)} fill={this.state.tiles[squareNum]} />
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
                    {this.state.previousTiles.length > 0 ? <button id="undo-button" onClick={() => this.undo()}>Undo</button> : null}
                    {this.state.previousTiles.length > 0 ? <button id="reset-button" onClick={() => this.reset()}>Reset</button> : null}
                </div>
            </div>
        );
    }
}

export default GameBoard;