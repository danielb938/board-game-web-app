import React from 'react';
import './ConnectFour.css';

class ConnectFour extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            blocks: [
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null)
            ],
            isRedTurn: true
        }
    }

    checkFull = (blocks) => {
        let counter = 0;
        for (let row = 0; row < blocks.length; row++) {
            for (let col = 0; col < blocks[row].length; col++) {
                if (blocks[row][col] !== null) {
                    counter += 1;
                 }
            }
        }
        if (counter === 36) {
           return true;
        }
     }

    currPlayerTurn = () => {
        let currPlayerTurn = 'Current Player: Red';
  
        if (this.decideWinner()) {
           currPlayerTurn = this.decideWinner();
           return currPlayerTurn;
        }
        else {
           if (this.checkFull(this.state.blocks)) {
              currPlayerTurn = "Tie Game!"
              return currPlayerTurn;
           }
           currPlayerTurn = 'Current Player: ' + (this.state.isRedTurn ? 'Red' : 'Yellow');
           return currPlayerTurn;
        }
     }

    decideWinner = () => {
        const blocks = this.state.blocks;
        
        //Check for Vertical Win
        for (let row = 0; row < blocks.length; row++) {
            if (row === 3) {
                break;
            }
            for (let col = 0; col < blocks[row].length; col++) {
                if (blocks[row][col] === 'R' && blocks[row + 1][col] === 'R' && blocks[row + 2][col] === 'R' && blocks[row + 3][col] === 'R') {
                    return "Winner: Red!"
                }
                else if (blocks[row][col] === 'Y' && blocks[row + 1][col] === 'Y' && blocks[row + 2][col] === 'Y' && blocks[row + 3][col] === 'Y'){
                    return "Winner: Yellow!"
                }
            }
        }

        //Check for Horizontal Win
        for (let row = 0; row < blocks.length; row++) {
            for (let col = 0; col < blocks[row].length; col++) {
                if (col === 3) {
                    break;
                }
                else {
                    if (blocks[row][col] === 'R' && blocks[row][col + 1] === 'R' && blocks[row][col + 2] === 'R' && blocks[row][col + 3] === 'R') {
                        return "Winner: Red!";
                    }
                    else if (blocks[row][col] === 'Y' && blocks[row][col + 1] === 'Y' && blocks[row][col + 2] === 'Y' && blocks[row][col + 3] === 'Y'){
                        return "Winner: Yellow!";
                    }
                }
            }
        }

        //Check for Left Diagonal Win 00 11 22 33
        for (let row = 0; row < blocks.length - 3; row++) {
            for (let col = 0; col < blocks[row].length - 3; col++) {
                if (blocks[row][col] === 'R' && blocks[row + 1][col + 1] === 'R' && blocks[row + 2][col + 2] === 'R' && blocks[row + 3][col + 3] === 'Y') {
                    return "Winner: Red!";
                }
                else if (blocks[row][col] === 'Y' && blocks[row + 1][col + 1] === 'Y' && blocks[row + 2][col + 2] === 'Y' && blocks[row + 3][col + 3] === 'Y') {
                    return "Winne: Yellow!";
                }
            }
        }

        //Check for Right Diagonal Win 05 14 23 32
        for (let row = 0; row < blocks.length - 3; row++) {
            for (let col = 3; col < blocks[row].length; col++) {
                if (blocks[row][col] === 'R' && blocks[row + 1][col - 1] === 'R' && blocks[row + 2][col - 2] === 'R' && blocks[row + 3][col - 3] === 'R') {
                    return "Winner: Red!";
                }
                else if (blocks[row][col] === 'Y' && blocks[row + 1][col - 1] === 'Y' && blocks[row + 2][col - 2] === 'Y' && blocks[row + 3][col - 3] === 'Y') {
                    return "Winne: Yellow!";
                }
            }
        }
    }

    handleClick = (event) => {
        if (this.decideWinner()) {
            return;
        }

        //let row = parseInt(event.target.dataset.row);
        let column = parseInt(event.target.dataset.col);

        if (this.state.isRedTurn) {
            this.setState(state => {
                for (let row = 5; row >= 0; row--) {
                    if (state.blocks[row][column] === null) {
                        state.blocks[row][column] = 'R';
                        return {
                            blocks: state.blocks,
                            isRedTurn: !state.isRedTurn
                        }
                    }
                }
            });
        }
        else {
            this.setState(state => {
                for (let row = 5; row >= 0; row--) {
                    if (state.blocks[row][column] === null) {
                        state.blocks[row][column] = 'Y';
                        return {
                            blocks: state.blocks,
                            isRedTurn: !state.isRedTurn
                        }
                    }
                }
            });
        }
    }

    restartGame = () => {
        this.setState({
            blocks: [
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null),
                Array(6).fill(null)
            ],
           isRedTurn: true
        });
     }

    render() {
        const gameboard = [];
        for (let rowIndex = 0; rowIndex < this.state.blocks.length; rowIndex++) {
            let row = (
                <div key={rowIndex} className="row">
                    {this.state.blocks[rowIndex].map((current, colIndex) => {
                        if (current === 'R') {
                            const newClass = "red";
                            return (
                                <div key={colIndex} className={newClass} onClick={this.handleClick} data-row={rowIndex} data-col={colIndex}></div>
                            );
                        }
                        else if (current === 'Y') {
                            const newClass = "yellow";
                            return (
                                <div key={colIndex} className={newClass} onClick={this.handleClick} data-row={rowIndex} data-col={colIndex}></div>
                            );
                        }
                        else {
                            return (
                                <div key={colIndex} className="td" onClick={this.handleClick} data-row={rowIndex} data-col={colIndex}></div>
                            );
                        }
                    })}
                </div>
            );
            gameboard.push(row);
        }
        return (
            <div>
                <div className="table">
                    {gameboard}
                </div>
                <div className="center">
                    <h2 className="sizeConfig">{this.currPlayerTurn()}</h2>
                    <button className="default" onClick={this.restartGame}>Restart Game</button>
                    <button className="default" onClick={() => this.props.switchPage('HOME')}>Home</button>
                    <button className="default" onClick={() => this.props.switchPage('TIC-TAC-TOE')}>Tic-Tac-Toe</button>
                </div>
          </div>
        );
    }
}


export default ConnectFour;
