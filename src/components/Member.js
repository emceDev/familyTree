import React from 'react'
import {listenMemberData} from '../db/Queries2'
import Card from 'react-bootstrap/Card'
import Partner from './Partner'
import { Button } from '@material-ui/core'
import { MemberShortDescription } from './MemberShortDescription'
import MemEdit from './MemEdit'
import { Avatar } from './Avatar'
import AddRelative from './AddRelative'
import {Options }from './Options'



function GetChildren(children,famKey){
    return(
        !!children ?
        children.map(x =>{
            return (
                <Member isPartner={false} key={x} memKey={x} famKey={famKey}/>
            )
            })
            :null
    )
}
class Member extends React.Component {
    constructor(){
        super()
        this.state={
            memKey:"",
            famKey:[],
            name:"",
            description:'',
            residence:'',
            children:[],
            siblings:[],
            isPartner:false,
            partner:'',
            memEdit:false,
            addRelButtons:true,
            addRelativeType:null,
            showOptions:false,
            type:null
        }
        this.addRelative = this.addRelative.bind(this)
        this.memEdit = this.memEdit.bind(this)
        this.showOptions = this.showOptions.bind(this)
    }
    addRelative(type){
        console.log("addRelative")
        this.setState({addRelativeType:type})
    }
    memEdit(x){
        this.setState({memEdit:x})
    }
    addRelButtons(x){
        x===true
        ?this.setState({addRelButtons:x})
        :setTimeout(() => {
            this.setState({addRelButtons:x})
        }, 1000);
    }
    showOptions(){
        this.setState({showOptions:!this.state.showOptions})
    }
    //state settings:
    componentDidMount(){
        const memData = listenMemberData(this.props.memKey)
        setTimeout(() => {
            memData.on('value', snap => {
                var data = snap.val()
                !!snap.val() 
                    ?
                    this.setState({
                        memKey:this.props.memKey,
                        name:data.name,
                        description:data.description,
                        residence:data.residence,
                        isPartner:this.props.isPartner,
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
        <div className="MemberComponent">
        <div className="Partners">
                {
                this.state.isPartner===false && !!this.state.partner
                    ?
                    <Member isPartner="true" memKey={this.state.partner} famKey={this.props.famKey}/>
                    :null
                }

            <div className="MemberData">

                <Card onClick={()=>this.showOptions()}>
                        {/* set default image */}

                        <div className="imageContainer">

                            <Avatar url={this.props.famKey+this.state.memKey}/>

                            <div className="overlay">

                                <MemberShortDescription 
                                name={this.state.name} 
                                description={this.state.description}
                                residence={this.state.residence}/>

                            </div>

                        </div>
                        <Card.Body>
                            <Card.Title>{this.state.name}</Card.Title>
                        </Card.Body>

                        </Card>
                {
                    this.state.addRelativeType !== null 
                        ?<AddRelative 
                            onMouseEnter={() => this.addRelButtons(true)} 
                            onMouseLeave={() => this.addRelButtons(false)}
                            type={this.state.addRelativeType} 
                            famKey={this.props.famKey} 
                            relKey={this.state.memKey}
                            memList={this.props.memList}
                            notify={this.addRelative}
                        />
                        :null
                }
                {
                this.state.showOptions === true 
                    ?
                    <Options showOptions={()=>{this.showOptions()}} addRelative={this.addRelative} memEdit={this.memEdit}/>
                    :null
                }
            </div>
        </div>

        {
                this.state.memEdit === true
                ?<MemEdit 
                memKey={this.state.memKey} 
                famKey={this.props.famKey}
                memEditDisplay={this.memEdit}/>
                :null
            }
        {this.state.isPartner === false || "undefined"
        ?
        <div style={{display:"flex",justifyContent:"space-evenly"}}className="MemberChildren" >
            {GetChildren(this.state.children, this.props.famKey)}
        </div>
        :console.log(this.state.isPartner+"jpr;d")
        }
      </div>)
    }
}

  export default Member