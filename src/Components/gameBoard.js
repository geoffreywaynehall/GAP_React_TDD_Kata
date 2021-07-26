import '../Style/gameBoard.css';
import React, { Component } from "react";

class GameBoard extends Component {
    render() {
        return (
            <div className="GameBoard">
                <table>
                    <tr>
                        <td></td>
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
                </table>
                <h2 className="turn-tracker">It is X's turn to go!</h2>
            </div>
        );
    }
}

export default GameBoard;