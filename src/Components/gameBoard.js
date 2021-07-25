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
            </div>
        );
    }
}

export default GameBoard;