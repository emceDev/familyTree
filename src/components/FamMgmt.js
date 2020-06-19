import React from 'react'
import FamList from './FamList'
import {getFromLocalStorage} from '../localStorage/user'
import Navigation from './Navigation'

class FamMgmt extends React.Component {
    state={
        famKey:null,
        formDisplay:true,
        dragToscroll:false
    }
    componentDidMount(){
        const famKey = getFromLocalStorage().famKey
        this.setState({famKey:famKey})
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
      <div className="FamMgmt">
        <Navigation/>
          <h1>You can edit yours family tree</h1>
          {!!this.state.famKey
          ?<FamList 
          famKey={this.state.famKey} 
          famName={this.state.famName}
          /> 
          :<form onSubmit={e=>this.handleSubmit(e)} >

          <input 
          placeholder="enterfamilyName"
          onChange={e=>{this.handleChange(e)}}>
          </input>

          <button type="submit">Create Family</button>
        </form>
          }
        
      </div>)
    }
}

  export default FamMgmt

