import React from 'react'
import FamList from './FamList'
import {app} from '../db/Config'
function FamilyAddForm(props){
    return(<div>
        <h1>FamilyAddForm</h1>
        <input placeholder="insert Yours family name" 
                onChange={e=>{props.handlechange(e)}}>
        </input>
        <button onClick={()=>{props.AddFamilyToDb()}}>Submit</button>
    </div>)
}
class FamMgmt extends React.Component {
    state={
        famKey:"-M6FeaBBtdzphqBLd6Km",
        famName:null,
    }
    componentDidMount(){
        //check if famKey isset for user
    }
    AddFamilyToDb(){
        const famKey = app.database().ref().child('/families/').push().key
        this.setState({famKey:famKey})
        app.database().ref('/families/' + famKey).update(this.state)
    }
    handleChange(e){
        this.setState({famName:e.target.value})
    }
    render() {
      return (
      <div>
          <h1>here you can manage your family with id:{this.state.famName}</h1>
          
          {/* zmienic na przyszlosc wykrzyknik na = */}
        {this.state.famKey===null ?
           <FamilyAddForm handlechange={this.handleChange.bind(this)} AddFamilyToDb={this.AddFamilyToDb.bind(this)}/> :
           <FamList famKey={this.state.famKey} famName={this.state.famName}/>
        }
      </div>)
    }
}

  export default FamMgmt

