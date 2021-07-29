import '../Style/gameBoard.css';
import React, { Component } from "react";

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            tile: ''
        };
    }

    render() {
        return (
            <div className="GameBoard">
                <table>
                    <tbody>
                        <tr>
                            <td id="square-0" onClick={() => this.setState({ tile: 'X' })}>{ this.state.tile }</td>
                            <td className="vertical"></td>
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
                <h2 className="turn-tracker">It is X's turn to go!</h2>
            </div>
        );
    }
}

export default GameBoard;