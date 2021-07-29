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
        let oldTiles = this.state.tiles;
        oldTiles[square] = this.state.turn;
        this.setState({
            tiles: oldTiles,
            turn: this.state.turn === 'X' ? 'O' : 'X'
        })
    }

    render() {
        return (
            <div className="GameBoard">
                <table>
                    <tbody>
                        <tr>
                            <td id="square-0" onClick={() => this.move(0)}>{ this.state.tiles[0] }</td>
                            <td id="square-1" onClick={() => this.move(1)} className="vertical">{this.state.tiles[1]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="horizontal"></td>
                            <td className="horizontal vertical"></td>
                            <td className="horizontal"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="vertical"></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <h2 className="turn-tracker">It is { this.state.turn }'s turn to go!</h2>
            </div>
        );
    }
}

export default GameBoard;