import * as React from 'react';

export class LeaderBoard extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {
           
       
        }
    }
    
    ShowWinners(){
        if(this.props.json){
            return this.props.json
        }else if (this.props.winners){
            return this.props.winners
        }
    }

    render(){
        return(
           <section className="leader">
               <h2>Leader Board</h2>
               {this.props.winners.map((elem,i)=>{               
               
                  return (
                      <div className="showWinners" key={i + "a" + i}>
                         
                            <p className="winner" key={i}>{elem.winner}: </p>
                            <p key={i + "b" + i}>{elem.date}</p>
                      </div>
                    
                     )
                })
                } 
           </section>
                       
                            
                
        )
    }
}
   
