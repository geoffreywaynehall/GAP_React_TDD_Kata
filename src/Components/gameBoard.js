import '../Style/gameBoard.css';
import React, { Component } from "react";

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
        this.checkVertical(tiles);
        this.checkHorizontal(tiles);
        this.checkDiagonal(tiles);
        if (this.state.previousTiles.length === 9 && this.state.win === '') {
            this.setState({
                win: 'TIE'
            });
        }
    }

    checkVertical(tiles) {
        if (tiles[0] === tiles[3] && tiles[3] === tiles[6]) {
            this.setState({
                win: tiles[0]
            });
        } else if (tiles[1] === tiles[4] && tiles[4] === tiles[7]) {
            this.setState({
                win: tiles[1]
            });
        } else if (tiles[2] === tiles[5] && tiles[5] === tiles[8]) {
            this.setState({
                win: tiles[2]
            });
        }
    }

    checkHorizontal(tiles) {
        if (tiles[0] === tiles[1] && tiles[1] === tiles[2]) {
            this.setState({
                win: tiles[0]
            });
        } else if (tiles[3] === tiles[4] && tiles[4] === tiles[5]) {
            this.setState({
                win: tiles[3]
            });
        } else if (tiles[6] === tiles[7] && tiles[7] === tiles[8]) {
            this.setState({
                win: tiles[6]
            });
        }
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
            turn: this.state.turn === 'X' ? 'O' : 'X'
        });
    }

    render() {
        return (
            <div className="GameBoard">
                <table>
                    <tbody>
                        <tr>
                            <td id="square-0" onClick={() => this.move(0)}>{ this.state.tiles[0] }</td>
                            <td id="square-1" onClick={() => this.move(1)} className="vertical">{this.state.tiles[1]}</td>
                            <td id="square-2" onClick={() => this.move(2)}>{this.state.tiles[2]}</td>
                        </tr>
                        <tr>
                            <td id="square-3" onClick={() => this.move(3)} className="horizontal">{this.state.tiles[3]}</td>
                            <td id="square-4" onClick={() => this.move(4)} className="horizontal vertical">{this.state.tiles[4]}</td>
                            <td id="square-5" onClick={() => this.move(5)} className="horizontal">{this.state.tiles[5]}</td>
                        </tr>
                        <tr>
                            <td id="square-6" onClick={() => this.move(6)}>{this.state.tiles[6]}</td>
                            <td id="square-7" onClick={() => this.move(7)} className="vertical">{this.state.tiles[7]}</td>
                            <td id="square-8" onClick={() => this.move(8)}>{this.state.tiles[8]}</td>
                        </tr>
                    </tbody>
                </table>
                { this.state.win === '' ? <h2 className="turn-tracker">It is {this.state.turn}'s turn to go!</h2> : this.state.win === 'TIE' ? <h2 className="turn-tracker">TIE!</h2> : <h2 className="turn-tracker">{this.state.win} WINS!</h2> }
                { this.state.previousTiles.length > 0 ? <button id="undo-button" onClick={() => this.undo()}>Undo</button> : null }
                { this.state.previousTiles.length > 0 ? <button id="reset-button" onClick={() => this.reset()}>Reset</button> : null }
            </div>
        );
    }
}

export default GameBoard;