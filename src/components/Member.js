import React from 'react'
import {listenMemberData} from '../db/Queries2'
import Card from 'react-bootstrap/Card'
import Partner from './Partner'
import { Button } from '@material-ui/core'
import { MemberShortDescription } from './MemberShortDescription'
import MemEdit from './MemEdit'
import { Avatar } from './Avatar'
import AddRelative from './AddRelative'


function GetChildren(children,famKey){
    return(
        !!children ?
        children.map(x =>{
            return <Member key={x} memKey={x} famKey={famKey}/>
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
            partner:'',
            memEdit:false,
            addRelButtons:true,
            addRelativeType:null,
            showOptions:false,
            type:null
        }
        this.addRelative = this.addRelative.bind(this)
        this.memEdit = this.memEdit.bind(this)
    }
    addRelative(type){
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
                        partner:data.partner,
                        children:data.children,
                        siblings:data.siblings,
                        type:data.type}):
                        console.log("no data at that")
                })  
        }, 50);
    }
    // Buttons for adding relatives
    Options() {
        return(
            <div className="Options">
                <Button size="small" variant="outlined"
                onClick={() => this.addRelative("/children/")}>AddChild
                </Button>

                <Button size="small" variant="outlined"
                onClick={() => this.addRelative("/partner/")}>AddPartner
                </Button>

                <Button size="small" variant="outlined"
                onClick={() => this.memEdit(true)}>EditMember
                </Button>
            </div>
    )
        
    }
    render() {
      return (
        <div className="MemberComponent">
        <div className="Partners"
        onMouseEnter={()=>{this.addRelButtons(true)}}
        onMouseLeave={()=>{this.addRelButtons(false)}}
        >
            <div className="Partner">
                {
                !!this.state.partner && this.state.type !== "/partner/"
                    ?
                    <Partner 
                    childrenKeys={this.state.children} 
                    memKey={this.state.partner} 
                    famKey={this.props.famKey}
                    />
                    :null
                }
            </div>

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
        </div>
        </div>

        {
                this.state.showOptions === true 
                    ? 
                    this.Options()
                    :null
                }
        {
                this.state.memEdit === true
                ?<MemEdit 
                memKey={this.state.memKey} 
                famKey={this.props.famKey}
                memEditDisplay={this.memEdit}/>
                :<p>{this.state.memEdit}</p>
            }

        <div className="MemberChildren">
            {GetChildren(this.state.children, this.props.famKey)}
        </div>
      </div>)
    }
}

  export default Member