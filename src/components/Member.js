import React from 'react'
import AddRelative from './AddRelative'
import {listenMemberData} from '../db/Queries2'
import Card from 'react-bootstrap/Card'
import {Image} from 'cloudinary-react';
import Partner from './Partner'

function GetChildren(children,famKey){
    return(
        !!children ?
        children.map(x =>{
            return <Member key={x} memKey={x} famKey={famKey} />
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
            children:[],
            siblings:[],
            partner:'',
            buttonDisplay:false,
            addRelativeType:null,
            type:null
        }
        this.addRelative = this.addRelative.bind(this)
    }
    Focus(x){
            this.setState({buttonDisplay:x})
    }
    addRelative(type){
        this.setState({addRelativeType:type})
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
                        partner:data.partner,
                        children:data.children,
                        siblings:data.siblings,
                        type:data.type}):
                        console.log("no data at that")
                })  
        }, 50);
    }
    styleFocused ={
        backgroundColor:"blue"
    }
    showDescription(e){
        console.log(e.target.style.color)
    }
    getChildren() {

    }
    AddRelativeButtons() {
        return(
            <div 
            className="addRelativeButtons" 
            onMouseEnter={() => this.Focus(true)}
            onMouseLeave={() => this.Focus(false)}
            >
                <button 
                onClick={() => this.addRelative("/children/")}>AddChild
                </button>

                <button 
                onClick={() => this.addRelative("/partner/")}>AddPartner
                </button>
            </div>
    )
        
    }
    render() {
      return (
        <div className="MemberComponent">
        <div className="Partners"  
        onMouseEnter={() => this.Focus(true)} 
        onMouseLeave={() => this.Focus(false)}
        >{console.log(this.props)}
            <div className="Partner" 
            onClick={e => {this.showDescription(e)}}
            >
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

            <div 
            className="MemberData" 
            onClick={e => this.showDescription(e)}
            >

            <Card>
            <Image 
            cloudName="m4t1ce" 
            publicId={ this.props.famKey + "/" + this.state.memKey }
            >
            </Image>

            <Card.Body>
                <Card.Title>{this.state.name}</Card.Title>
            </Card.Body>

            </Card>
        </div>
        </div>
            {
            this.state.buttonDisplay === true 
                ? 
                this.AddRelativeButtons()
                :null
            }
            {
            this.state.addRelativeType !== null 
                ?
                <AddRelative 
                type={this.state.addRelativeType} 
                famKey={this.props.famKey} 
                relKey={this.state.memKey}
                memList={this.props.memList}
                notify={this.addRelative}
                />
                :null
            }
        <div className="MemberChildren">
            {GetChildren(this.state.children, this.props.famKey)}
        </div>
      </div>)
    }
}

  export default Member