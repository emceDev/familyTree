import React from 'react'
import AddRelative from './AddRelative'
import {app} from '../db/Config'

class Member extends React.Component {
    state={
        memKey:"",
        famKey:[],
        name:"",
        children:[],
        siblings:[],
        partner:'',
        buttonDisplay:false,
        addRelativeType:null
    }
    Focus(){
        this.setState({buttonDisplay:!this.state.buttonDisplay})
        //make component bigger(focus)
        //On hover: display buttons around it
    }
    addRelative(type){
        this.setState({addRelativeType:type})
        //show addRelative according to type
    }
    componentDidMount(){
        this.setState({memKey:this.props.memKey})
        const memData = app.database().ref('/members/' + this.props.memKey)
        setTimeout(() => {
            memData.on('value',snap => {
                var data = snap.val()
                !!snap.val() ?
                    this.setState({
                        name:data.name,
                        famKey:data.famKey,
                        partner:data.partner,
                        children:data.children,
                        siblings:data.siblings,
                        type:data.type}):
                        console.log("no data at that")
                })  
        }, 50);
    }

    render() {
      return (
      <div onMouseEnter={()=>this.Focus()} 
            onMouseLeave={()=>this.Focus()}
            style={{background:"grey", margin:"0 auto" ,width:"40vw", marginTop:"10vh"}}
      >
            <p>Member Name:{this.state.name}</p>
            <div style={{backgroundColor:"blue"}}>
                <p>children:</p>
                {
                this.state.children === undefined||null?
                null:
                this.state.children.map(x =>{
                    return <p key={x}> {x} </p>
                })
                }
            </div>
            {          
            <div style={{backgroundColor:"green"}}>
                <p>siblings:</p>  
                {this.state.siblings === undefined||null?
                null:
                this.state.siblings.map( x =>{
                    return <p key={x}> {x} </p>
                })
                }
            </div>
            }
            {
            <div>
                <p>partner"</p>
                {this.state.partner === undefined||null?
                null:
                <p>{this.state.partner}</p>
                }
            </div>
            }
            {  
            this.state.buttonDisplay!=="x" ? 
                <div>
                    <button onClick={()=>this.addRelative("/children/")}>AddChild</button>
                    <button onClick={()=>this.addRelative("/siblings/")}>AddSibling</button>
                    <button onClick={()=>this.addRelative("/partner/")}>AddPartner</button>
                </div>
                : <p>Hover mouse on member you want to edit</p>
            }
            {this.state.addRelativeType!==null ?
                <AddRelative type={this.state.addRelativeType} 
                            famKey={this.props.famKey} 
                            relKey={this.props.memKey}
                            memList={this.props.memList}/>
                            :null
            }
      </div>)
    }
}

  export default Member

