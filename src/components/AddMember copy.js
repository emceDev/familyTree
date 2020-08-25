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
            var famKey = JSON.parse(localStorage.getItem('user')).famKey
            app.database().ref('members/' + this.state.memKey + '/').update(this.state)
            app.database().ref('families/' + famKey).update({'/memKeys/':[this.state.memKey]})
        }, 1000);
    }
    handleChange(e){
        this.setState({name:e.target.value})
    }
    render() {
      return (
      <div className="FirstMember">
          <h3>Add first member:</h3>
          <Upload 
          memKey={this.state.memKey} 
          famKey={this.props.famKey}
          />
          <Input 
          placeholder="Name" 
          onChange={e => {this.handleChange(e)}}
          >
          </Input>
          <Button variant="outlined"
          onClick={() => {this.PostMember()}}
          >Confirm
          </Button>
      </div>)
    }
}

  export default AddMember

