import '../Style/gameBoard.css';
import React, { Component } from "react";

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            tiles: ['','','','','','','','',''],
            turn: 'X'
        };
    }

    move(square: Number) {
        if (this.state.tiles[square] === '') {
            let oldTiles = this.state.tiles;
            oldTiles[square] = this.state.turn;
            this.setState({
                tiles: oldTiles,
                turn: this.state.turn === 'X' ? 'O' : 'X'
            });
        }
    }

    reset() {
        this.setState({
            tiles: ['', '', '', '', '', '', '', '', '']
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
                <h2 className="turn-tracker">It is {this.state.turn}'s turn to go!</h2>
                <button id="reset-button" onClick={() => this.reset()}>Reset</button>
            </div>
        );
    }
}

export default GameBoard;