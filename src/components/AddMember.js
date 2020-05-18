import React from 'react'
import {app} from '../db/Config'
import Upload from './Upload'
import { Button,Input } from '@material-ui/core'
class AddMember extends React.Component {
    state={
        memKey:[],
        famKey:[],
        name:"name",
        description:"description",
        residence:"residence",
        famName:"family name",
        parent:null,
        partner:null,
        children:null,
        type:null
    }
    componentDidMount(){
        const memKey = app.database().ref('/members/').push().key
        this.setState({memKey:memKey})
    }
    PostMember(){
        setTimeout(() => {
            app.database().ref('members/' + this.state.memKey + '/').update(this.state)
            app.database().ref('families/' + this.props.famKey).update({'/memKeys/':[this.state.memKey]})
        }, 1000);
    }
    handleChange(e){
        this.setState({name:e.target.value})
    }
    render() {
      return (
      <div>
          <p>Add first member:</p>
          <Upload 
          memKey={this.state.memKey} 
          famKey={this.props.famKey}
          />
          <Input 
          placeholder="FirstMemberName" 
          onChange={e => {this.handleChange(e)}}
          >
          </Input>
          <Button variant="outlined"
          onClick={() => {this.PostMember()}}
          >PostMember
          </Button>
      </div>)
    }
}

  export default AddMember

