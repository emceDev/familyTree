import React from 'react'
import {postData} from '../db/Queries'
class FamilyCreation extends React.Component {
    state={
        type:"families/",
        name:"",
        membersId:["test","test1"]     
    }

    handleChange(event){
        this.setState({name:event.target.value})
    }
    createFamily(){
        const key = postData(this.state)
        console.log("key = ===",key)
    }
    render() {
      return (<div>
          <h1>Insert Family</h1>
          <input type="text" placeholder="familyname" onChange={(event)=>this.handleChange(event)}></input>
          <button onClick={() => {this.createFamily()}}>CreateFamily</button>
          {/* <button onClick={() => this.props.postDataProps(this.state)}>CreateFamily</button> */}
      </div>)
    }
}

  export default FamilyCreation

