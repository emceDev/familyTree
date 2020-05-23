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
    scrollHandle(e){
      if(this.state.dragToscroll===true){
        if(e.clientX<400){
          window.scrollTo(e.clientX-70,e.clientY)
        }if(e.clientY<50){
          window.scrollTo(e.clientX,e.clientY-20)
        }else{
          window.scrollTo(e.clientX,e.clientY)
        }
        console.log(e.clientY)
      }else
      {return}
  }
    render() {
      return (
      <div className="FamMgmt"
      onMouseMove={(e)=>{this.scrollHandle(e)}}>
        <Navigation/>
          <h1>You can edit yours family tree</h1>
          <p>choose preview opions</p>
          <button onClick={()=>{this.setState({dragToscroll:!this.state.dragToscroll})}}>drag to scroll</button>
          <button onClick={()=>{this.setState({previewMode:true})}}>enble Preview Mode</button>
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

