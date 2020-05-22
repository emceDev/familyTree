import React from 'react'
import { listenMemberData, editMember,deleteMember } from '../db/Queries2'
import { Button,Input,TextField } from '@material-ui/core'
class MemEdit extends React.Component{
    state={
        famKey:null,
        memKey:null,
        name:"name",
        famName:"family Name",
        description:"description",
        residence:"residence"
    }
    componentDidMount(){
        this.setState({famKey:this.props.famKey,memKey:this.props.memKey})
        const memData = listenMemberData(this.props.memKey)
        setTimeout(() => {
        memData.on('value', snap => {
            var data = snap.val()
            !!snap.val() 
                ?
                this.setState({
                    memKey:this.props.memKey,
                    famKey:this.props.famKey,
                    name:data.name,
                    description:data.description,
                    residence:data.residence,
                    familyName:data.familyName,}):
                    console.log("no data at memEdit")
            })
        }, 50);  
    }
    handleChange(e){
        var name=e.target.name
        this.setState({
            [name]:e.target.value
        })
        console.log(e.target.value)
    }
    save(){
        editMember(this.state)
    }
    delete(){
        deleteMember(this.state.memKey,this.state.famKey)
    }
    render(){
        return(
            <div className="MemEditOverlay" 
            onClick={()=>this.props.memEditDisplay(false)}>
                <div 
                className="MemEdit" 
                onChange={(e)=>{this.handleChange(e)}}
                onClick={(e)=>{e.stopPropagation()}}>
                    <p>{this.state.famName}</p>
                    <Input 
                    variant="outlined" 
                    name="name" 
                    placeholder={this.state.name}>
                    </Input>

                    <TextField 
                    variant="outlined" 
                    name="description" 
                    placeholder={this.state.description}>
                    </TextField>

                    <Input 
                    variant="outlined" 
                    name="residence" 
                    placeholder={this.state.residence}>
                    </Input>
                    
                    <Button 
                    onClick={()=>{this.save();
                    this.props.memEditDisplay(false)}}
                    >Save Changes
                    </Button>
                    <Button 
                    size="small"
                    onClick={()=>{this.delete();
                    this.props.memEditDisplay(false)}}
                    style={{backgroundColor:"red"}}
                    >Delete member
                    </Button>
                </div>
            </div>
        )
    }
}
export default MemEdit