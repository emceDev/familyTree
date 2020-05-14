import React from 'react'
import {getKey,familyMemberKeys,addToMembers,addMemberToDb} from '../db/Queries2'
import Upload from './Upload'
class AddRelative extends React.Component {
    state={
        memKey:"",
        famKey:[],
        name:"",
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
      <div>
          <Upload 
          memKey={this.state.memKey} 
          famKey={this.props.famKey}
          />

          <input 
          placeholder="name" 
          onChange={e => this.setState({name:e.target.value})}>
          </input>

          <button 
          onClick={()=>{this.PostMember()}}
          >
            PostMember
          </button>
      </div>)
    }
}

  export default AddRelative

