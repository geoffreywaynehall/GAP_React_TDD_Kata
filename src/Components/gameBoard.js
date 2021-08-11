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

    render() {
        return (
            <div className="GameBoard">
                <table>
                    <tbody>
                        <tr>
                            <Square num={0} onClick={() => this.move(0)} fill={this.state.tiles[0]} />
                            <Square num={1} onClick={() => this.move(1)} fill={this.state.tiles[1]} />
                            <Square num={2} onClick={() => this.move(2)} fill={this.state.tiles[2]} />
                        </tr>
                        <tr>
                            <Square num={3} onClick={() => this.move(3)} fill={this.state.tiles[3]} />
                            <Square num={4} onClick={() => this.move(4)} fill={this.state.tiles[4]} />
                            <Square num={5} onClick={() => this.move(5)} fill={this.state.tiles[5]} />
                        </tr>
                        <tr>
                            <Square num={6} onClick={() => this.move(6)} fill={this.state.tiles[6]} />
                            <Square num={7} onClick={() => this.move(7)} fill={this.state.tiles[7]} />
                            <Square num={8} onClick={() => this.move(8)} fill={this.state.tiles[8]} />
                        </tr>
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