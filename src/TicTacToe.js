import React from 'react';
import './TicTacToe.css';

class TicTacToe extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         blocks: [null, null, null, null, null, null, null, null, null],
         isXTurn: true,
      }
   }

   checkFull = (blocksArray) => {
      let counter = 0;
      for (let i = 0; i < blocksArray.length; i++) {
         if (blocksArray[i] !== null) {
            counter += 1;
         }
      }
      if (counter === 9) {
         return true;
      }
   }

   currPlayerTurn = () => {
      let currPlayerTurn = 'Current Player: X';

      if (this.decideWinner()) {
         currPlayerTurn = this.decideWinner();
         return currPlayerTurn;
      }
      else {
         if (this.checkFull(this.state.blocks)) {
            currPlayerTurn = "Tie Game!"
            return currPlayerTurn;
         }
         currPlayerTurn = 'Current Player: ' + (this.state.isXTurn ? 'X' : 'O');
         return currPlayerTurn;
      }
   }

   decideWinner = () => {
      const blocks = this.state.blocks;
      const winningScenarios = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
      ];

      for (let i = 0; i < winningScenarios.length; i++) {
         if (blocks[winningScenarios[i][0]] === 'X' && blocks[winningScenarios[i][1]] === 'X' && blocks[winningScenarios[i][2]] === 'X') {
            return 'Winner: X!';
         }
         else if (blocks[winningScenarios[i][0]] === 'O' && blocks[winningScenarios[i][1]] === 'O' && blocks[winningScenarios[i][2]] === 'O') {
            return 'Winner: O!';
         }
      }
   }

   handleClick = (event) => {
      if (this.decideWinner()) {
         return;
      }

      //Parse the event.target.name to allow for use of it when indexing into an array
      const oldValue = parseInt(event.target.dataset.name);

      if (this.state.isXTurn) {
         this.setState(state => {
            if (state.blocks[oldValue] === null) {
               state.blocks[oldValue] = 'X';
               document.getElementById(oldValue).style.color = "red";
               return {
                  blocks: state.blocks,
                  isXTurn: !state.isXTurn
               }
            }
         });
      }
      else {
         this.setState(state => {
            if (state.blocks[oldValue] === null) {
               state.blocks[oldValue] = 'O';
               document.getElementById(oldValue).style.color = "yellow";
               return {
                  blocks: state.blocks,
                  isXTurn: !state.isXTurn
               }
            }
         });
      }
   }

   restartGame = () => {
      this.setState({
         blocks: [null, null, null, null, null, null, null, null, null],
         isXTurn: true
      });
   }

   render() {
      return (
         <div>
            <div className="table">
               <div className="row">
                  <div className="td" onClick={this.handleClick} id="0" data-name="0">{this.state.blocks[0]}</div>
                  <div className="td" onClick={this.handleClick} id="1" data-name="1">{this.state.blocks[1]}</div>
                  <div className="td" onClick={this.handleClick} id="2" data-name="2">{this.state.blocks[2]}</div>
               </div>
               <div className="row">
                  <div className="td" onClick={this.handleClick} id="3" data-name="3">{this.state.blocks[3]}</div>
                  <div className="td" onClick={this.handleClick} id="4" data-name="4">{this.state.blocks[4]}</div>
                  <div className="td" onClick={this.handleClick} id="5" data-name="5">{this.state.blocks[5]}</div>
               </div>
               <div className="row">
                  <div className="td" onClick={this.handleClick} id="6" data-name="6">{this.state.blocks[6]}</div>
                  <div className="td" onClick={this.handleClick} id="7" data-name="7">{this.state.blocks[7]}</div>
                  <div className="td" onClick={this.handleClick} id="8" data-name="8">{this.state.blocks[8]}</div>
               </div>
            </div>
            <div className="center">
               <h2 className="sizeConfig">{this.currPlayerTurn()}</h2>
               <button className="default" onClick={this.restartGame}>Restart Game</button>
               <button className="default" onClick={() => this.props.switchPage('HOME')}>Home</button>
               <button className="default" onClick={() => this.props.switchPage('CONNECT FOUR')}>Connect Four</button>
            </div>
         </div>
      );
   }
}

export default TicTacToe;
