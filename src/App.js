import React from 'react';
import TicTacToe from './TicTacToe'
import ConnectFour from './ConnectFour'
import './App.css';
import TicTacToeLogo from "./TicTacToeLogo.png"
import ConnectFourLogo from "./ConnectFourLogo.png"

class App extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         currPage: "HOME"
      }
   }

   switchPage = (newPage) => {
      this.setState((state) => ({
         currPage: newPage
      }));
   }

   render() {
      if (this.state.currPage === 'TIC-TAC-TOE') {
         return ( 
            <div>
               <TicTacToe switchPage={this.switchPage} />
            </div>
         );
      }
      else if (this.state.currPage === 'CONNECT FOUR') {
         return (
            <div>
               <ConnectFour switchPage={this.switchPage} />
            </div>
         )
      }
      else {
         //const height = parseInt(window.innerHeight/2);
         //const width = parseInt(window.innerWidth/2);
         
         return (
            <div>
               <h1 className="center colorText">Board Game Plaza!</h1>
               <div className="row">
                     <img src={TicTacToeLogo} className="configImage" alt="TicTacToeLogo" id="firstBG"  onClick={() => this.switchPage('TIC-TAC-TOE')}></img>
                     <img src={ConnectFourLogo} className="configImage" alt="ConnectFourLogo" id="secondBG" onClick={() => this.switchPage('CONNECT FOUR')}></img>
               </div>
            </div>
         );
      }
   }
}

export default App;
