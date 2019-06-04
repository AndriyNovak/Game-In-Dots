import * as React from 'react';
let arrGenerateFild =[];

export class Field extends React.Component {
    constructor(props,state){
        super(props,state);
        this.state = {
          
        }
        
    }
   

    fieldGenerate(){
        arrGenerateFild =[];        
            for(let i = 1;i<this.props.mode[this.props.selectMode].field+1;i++){
            arrGenerateFild.push(i);
                        
            }
           
    }
   


    isCellRed(i,j){            
        for(let h=0;h<this.props.redCells.length;h++){
            if( this.props.redCells[h][0]===i &&  this.props.redCells[h][1]===j){
               return true
            }             
        }
        return false
    }
    isCellGreen(i,j){   
       
            for(let g=0;g<this.props.GreenCells.length;g++){
                if( this.props.GreenCells[g][0]===i &&  this.props.GreenCells[g][1]===j){
                return true
                }             
            }
        return false
    }
  
    showName(){
        
        if(this.props.inpValue){
            return <p>{this.props.inpValue}</p>
        }
        
    }
    
        
// --------------------------------RENDER----------------------------------------
    render(){
        
        if(this.props.selectMode!==""){
                this.fieldGenerate();
                
        }
        
        return(
           <section className="field">
               <div><p>Let`s to play: </p></div>
               <div> {this.showName()}</div>
               <table>
                    <tbody>
                    {arrGenerateFild.map((elem,i)=>{                       
                            return (
                                <tr key={i}>
                                    {arrGenerateFild.map((elem,j)=>{ 
                                        if( this.props.blueCell && this.props.blueCell[0]===i && this.props.blueCell[1]===j) {
                                            
                                            return <td  onClick={()=>this.props.getClickOnCell(i,j,this.props.blueCell)} key={i +"b" + j} className="block-field setBlueColor" ></td> 
                                        }
                                       
                                        if( this.props.redCells &&  this.isCellRed(i,j)) {                                                
                                                return <td  key={i + "a" + j} className="block-field setRedColor" ></td> 
                                                                                      
                                        }
                                       
                                        if(this.props.GreenCells &&  this.isCellGreen(i,j) ) {
                                            return <td  key={i + "d" + j} className="block-field setGreenColor" ></td>  
                                        }
                                        
                                        return <td  key={i + "c" + j} className="block-field" ></td>                            
                                    })
                                    }  
                                </tr>  
                            )
                        })
                        }  
                        
                    </tbody>
                </table>

           </section>
        )
    }
}
   
