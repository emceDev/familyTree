import React from 'react'
import FamList from './FamList'
import {app} from '../db/Config'
import {getFromLocalStorage} from '../localStorage/user'
import Navigation from './Navigation'

class FamMgmt extends React.Component {
    state={
        famKey:null,
        famName:null,
        formDisplay:true
    }
    componentDidMount(){
        const famKey = getFromLocalStorage().famKey
        this.setState({famKey:famKey})
    }
    AddFamilyToDb(){
        const famKey = this.state.famKey
        app.database().ref('/families/' + famKey).update(this.state)
    }
    handleChange(e){
        this.setState({famName:e.target.value})
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({formDisplay:false})
        console.log("handle submit")
    }
    render() {
      return (
      <div>
        <Navigation/>
          <h1>here you can edit your family here</h1>
          {this.state.formDisplay===true
          ? <form onSubmit={e=>this.handleSubmit(e)}>

              <input 
              placeholder="enterfamilyName"
              onChange={e=>{this.handleChange(e)}}>
              </input>

              <button type="submit">Submit Name</button>
            </form>

          :<FamList 
            famKey={this.state.famKey} 
            famName={this.state.famName}
            />
          }
        }
      </div>)
    }
}

  export default FamMgmt

