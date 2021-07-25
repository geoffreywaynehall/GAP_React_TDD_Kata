import React, { Component } from "react";

class GameBoard extends Component {
    render() {
        return (
            <div className="GameBoard">
                <table>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <h2 className="turn-tracker"></h2>
            </div>
        );
    }
}

export default GameBoard;