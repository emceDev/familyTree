import React from 'react'
import {postData,displayPerson} from '../db/Queries'
class PersonCreation extends React.Component {
    state={
        type:"members/",
        name:"",
        familyId:['-M5mR6xHh0edKw5MNhFh']   
    }

    handleChange(event){
        this.setState({name:event.target.value})
    }
    createPerson(){
        const key = postData(this.state)
        console.log("key = ===",key)
        setTimeout(() => {
            // console.log("display person"+displayPerson(key))
            const members = displayPerson(key)
        }, 1500);
        setTimeout(() => {
            members.map(x=>{console.log(x)})
        }, 1000);
    }
    render() {
      return (<div>
          <h1>Insert Person</h1>
          <input type="text" placeholder="PersonName" onChange={(event)=>this.handleChange(event)}></input>
          <button onClick={() => {this.createPerson()}}>CreatePerson</button>
          {/* <button onClick={() => {this.props.postDataProps(this.state)}}>CreatePerson</button> */}
      </div>)
    }
}

  export default PersonCreation

