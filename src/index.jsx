
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {GameMode} from "./components/GameMode.jsx";
import {Field} from "./components/Field.jsx";
import {LeaderBoard} from "./components/LeaderBoard.jsx";
import "./components/style.scss";

let rand1;
let rand2;
let clearTime;
let newDate = new Date();

class App extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {
            selectMode:"",
            inpValue:"",
            blueCell:[0,0],
            redCells:[],
            GreenCells:[],                    
            mode:"",
            winners:[],
            json:[],
            selectDisabled:false,
            buttonPlayGame:"PLAY",
            newInpValue:"",
           
        }
        
    }


    
    async request()  {
        const request = await fetch(`http://starnavi-frontend-test-task.herokuapp.com/game-settings`);
        const mode = await request.json();        
         this.setState({
                mode:mode
        })
    }
    
    async requestWinners()  {
        const requestWinners = await fetch(`http://starnavi-frontend-test-task.herokuapp.com/winners`);
        const winners = await requestWinners.json();        
         this.setState({
                winners:winners
        })
    }
    async requestWinnersPOST(inpValue)  {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                winner:   inpValue,
                date:   newDate.toLocaleString()
            })
        };    
        const data = await fetch(`http://starnavi-frontend-test-task.herokuapp.com/winners`, settings)
            .then(response => response.json())
            .then(json => {
                return this.setState({
                             winners:json
                        })
            })
            .catch(e => {
                return e
            });
    
        return data;
        
    }

    chooseMode(selectMode,inpValue){
        this.setState({
            selectMode:selectMode,
            inpValue:inpValue,
            newInpValue:inpValue
        })
    }
   
    componentDidMount(){
       this.request();
       this.requestWinners();
       
    }
    randomNumber(min, max) {        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 
    
   isBlueCellInRedArr(){
        for(let g=0;g<this.state.GreenCells.length;g++){
            if( this.state.GreenCells[g][0]===this.state.blueCell[0] &&  this.state.GreenCells[g][1]===this.state.blueCell[1]){
                return true
            }             
        } 
        return false
    }
    IsBlueCellInGreenArrCells(rand1,rand2){
        
        for (var i = 0; i < this.state.GreenCells.length; i++) {
            if(i>=Math.round((((Math.pow(this.state.mode[this.state.selectMode].field,2)))/2))){               
                console.log(" User WON");
                // alert("User WIN");  
                clearInterval(clearTime);
                this.requestWinnersPOST(this.state.inpValue)
                this.setState ({            
                    buttonPlayGame : "PLAY AGAIN" ,
                    selectDisabled : false,
                    inpValue: this.state.newInpValue + " WON"
                });
            }
            if (this.state.GreenCells[i][0] === rand1 && this.state.GreenCells[i][1] === rand2) {
                
                return true;
            }
        }
        return false;
    }
    IsBlueCellInRedArrCells(rand1,rand2){        
        for (var i = 0; i < this.state.redCells.length; i++) {
            if(i>=Math.round((((Math.pow(this.state.mode[this.state.selectMode].field,2)))/2))){               
                console.log("Computer WON");                
                // alert("Computer WIN");
                clearInterval(clearTime);                
                this.requestWinnersPOST("Computer");
                this.setState ({            
                    buttonPlayGame : "PLAY AGAIN",
                    selectDisabled : false  ,
                    inpValue:" Computer WON"

                });
            }
            if (this.state.redCells[i][0] ===rand1 && this.state.redCells[i][1] === rand2) {
               
                return true; 
            }
        }
        return false;
    }

    getClickOnCell(i,j,blueCell){
        
            if ( blueCell && blueCell[0]===i && blueCell[1]===j ){
            this.setState({                
                GreenCells:[...this.state.GreenCells,this.state.blueCell]
            })
            
        }
        
    }
    funcClearTime(mode,selectMode){
        clearTime =  setInterval(()=> {
            if(this.state.blueCell && this.isBlueCellInRedArr()!==true ){ 
                this.setState({
                    redCells:[...this.state.redCells,this.state.blueCell]                   
                })
            } 
            if(selectMode){               
                rand1 = this.randomNumber(0,mode[selectMode].field-1);             
                rand2 = this.randomNumber(0,mode[selectMode].field-1);
                
                while(this.IsBlueCellInRedArrCells(rand1,rand2)  || this.IsBlueCellInGreenArrCells(rand1,rand2)){
                    rand1 = this.randomNumber(0,mode[selectMode].field-1);             
                    rand2 = this.randomNumber(0,mode[selectMode].field-1);  
                }                   

                this.setState({
                    blueCell: [rand1,rand2]
                    
                })
                
            } 
    },mode[selectMode].delay);
    // },300);
    }
  
    
    clickBtnPlayAgain(buttonPlayGame){
        if(buttonPlayGame==="PLAY AGAIN"){           
            this.setState ({            
                selectDisabled : false ,
                buttonPlayGame : "PLAY" ,
                GreenCells:[],
                redCells:[] ,
                blueCell:[0,0],
                inpValue:this.state.newInpValue
            });
            
            // this.funcClearTime(this.state.mode,this.state.selectMode);
            
        }else if(buttonPlayGame==="PLAY"){
            this.setState ({            
                selectDisabled : true, 
                inpValue:this.state.inpValue
            });
            this.funcClearTime(this.state.mode,this.state.selectMode);
        }
    }

    //-----------------------------------------Render---------------------------------------
    render() {
       
            return (
                <div className="main">
                    <div className="wrapper">
                        
                        <GameMode
                            mode={this.state.mode} 
                            chooseMode={this.chooseMode.bind(this)}                             
                            blueCell = {this.state.blueCell}  
                            redCells = {this.state.redCells}                             
                            GreenCells = {this.state.GreenCells}
                            randomNumber = {this.randomNumber} 
                            selectDisabled={this.state.selectDisabled} 
                            buttonPlayGame={this.state.buttonPlayGame} 
                            clickBtnPlayAgain={this.clickBtnPlayAgain.bind(this)}                    
                        />
                        <Field
                            mode={this.state.mode}
                            selectMode={this.state.selectMode}
                            inpValue={this.state.inpValue}
                            blueCell = {this.state.blueCell}
                            redCells = {this.state.redCells}
                            GreenCells = {this.state.GreenCells}
                            getClickOnCell = {this.getClickOnCell.bind(this)}                           
                            randomNumber = {this.randomNumber}
                            
                        />
                       
                      
                    </div>
                    <LeaderBoard
                      winners={this.state.winners}
                      json={this.state.json}
                    />
                </div>
            )
    }
}

ReactDOM.render(<App/>, document.getElementById('main-wrap'));