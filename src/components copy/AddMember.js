import React from 'react'
import {app} from '../db/Config'
class AddMember extends React.Component {
    state={
        memKey:[],
        famKey:[],
        name:"",
        parent:null,
        partner:null,
        children:null,
        type:null
    }
    PostMember(){
        const memKey = app.database().ref('/members/').push().key
        this.setState({memKey:memKey})
        setTimeout(() => {
            app.database().ref('members/' + this.state.memKey + '/').update(this.state)
            app.database().ref('families/' + this.props.famKey).update({'/memKeys/':[memKey]})
        }, 2000);
    }
    handleChange(e){
        this.setState({name:e.target.value})
    }
    render() {
      return (
      <div>
          <p>Add first member:</p>
          <input placeholder="name" onChange={(e)=>{this.handleChange(e)}}></input>
          <button onClick={()=>{this.PostMember()}}>PostMember</button>
      </div>)
    }
}

  export default AddMember

