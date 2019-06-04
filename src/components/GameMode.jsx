import * as React from 'react';
// let selectDisabled;
export class GameMode extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {
            selectMode:"",
            inpValue:"",
            GreenCells:[],
            redCells:[]
            
        }
      
    }
    
    handleSelectChange(event){
        this.setState ({            
            selectMode:event.target.value ,
                  
        });
        this.props.chooseMode(event.target.value,this.state.inpValue)
       
    }
    handleInputChange(event){
        this.setState ({            
            inpValue : event.target.value  
        });
     
        this.props.chooseMode(this.state.selectMode,event.target.value)
    }
    
    
    render(){
       
        return(
            <section  className="mode  ">
                   
                    <select disabled={this.props.selectDisabled}  defaultValue="Pick game mode" onChange={this.handleSelectChange.bind(this)} className="form-control selectMode">                          
                       <option  value="Pick game mode" key={0} hidden>Pick game mode</option>   
                       <option value="easyMode" key={1}>easymode</option>                         
                       <option value="normalMode" key={2}>normalMode</option>     
                       <option value="hardMode"key={3}>hardMode</option>     
                    </select>
                    
                        
                    <input  disabled={this.props.selectDisabled} value={this.state.inpValue} type="text" onChange={this.handleInputChange.bind(this)}    placeholder="Enter name" className="form-control search-input"></input>
                   
                        
                    
                    <button disabled={this.props.selectDisabled}  onClick={()=>this.props.clickBtnPlayAgain(this.props.buttonPlayGame)} className="btn btn-outline-primary btnPlay">{this.props.buttonPlayGame}</button>
                     
            </section>
        )
    }
}
   
