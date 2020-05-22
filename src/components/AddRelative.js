import React from 'react'
import {getKey,familyMemberKeys,addToMembers,addMemberToDb} from '../db/Queries2'
import Upload from './Upload'
import { Button,Input } from '@material-ui/core'

class AddRelative extends React.Component {
    state={
        memKey:"",
        famKey:[],
        name:"name",
        description:"description",
        residence:"residence",
        children:[],
        siblings:[],
        parent:[],
        partner:null,
        type:null
    }
    componentDidMount(){
      const memKey = getKey('/members/')
        this.setState({memKey:memKey})
        this.setState({famKey:this.props.famKey, type:this.props.type})
        if(this.props.type==='/children/')
        {
          this.setState({parent:this.props.relKey})
        }
        else if(this.props.type === '/partner/')
        {
          this.setState({partner:this.props.relKey})
        }
        else if(this.props.type === '/siblings/')
        {
          var siblingsArray = [this.props.relKey]
          this.setState({siblings:siblingsArray})
        }
    }
    PostMember(){
      this.props.notify(null)
      setTimeout(() => 
      {
        addMemberToDb(this.props.relKey,this.state.memKey,this.state.type)
        familyMemberKeys(this.state.memKey,this.props.famKey)
      }, 30);
      addToMembers(this.state.memKey,this.state)

    }
    render() {
      return (
      <div className="addRelativeFormOverlay"
      onClick={()=>{this.props.notify(null)}}>
      <div className="addRelativeForm"
      onClick={(e)=>e.stopPropagation()}
      >
          <Upload 
          memKey={this.state.memKey} 
          famKey={this.props.famKey}
          />

          <Input 
          placeholder="name" 
          onChange={e => this.setState({name:e.target.value})}>
          </Input>

          <Button variant="outlined"
          onClick={()=>{this.PostMember()}}
          >
            PostMember
          </Button>
      </div>
      </div>)
    }
}

  export default AddRelative

