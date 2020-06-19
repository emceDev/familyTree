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
    scrollHandle2(e){
      const mouseX = e.clientX
      const mouseY = e.clientY
      const screenX = window.innerWidth
      const screenY = window.innerHeight
      const midX = screenX/2
      const midY = screenY/2
      console.log(mouseX,"  ",midX,"  ",mouseY,"  ",midY)
    window.scrollTo({
      left: mouseX,
      top: mouseY,
      behavior:'auto'
    }
    )
      // window.scrollBy({
      //   top: mouseY-midY,
      //   left: mouseX-midX,
      //   behavior: 'smooth'
      // });
    }
    handleScroll3(e) {
      console.log(
        window.innerHeight,
        window.innerWidth,
        "    ",
        e.clientY,
        e.clientX
      );
      var y = window.innerHeight / 2 - e.clientY;
      var x = window.innerWidth / 2 - e.clientX;
      if (y > 50 || y < 50 || x > 140 || x < 140) {
        if (y > 50) {
          window.scrollBy(0, -20);
        } else if (y < -50) {
          window.scrollBy(0, 20);
        }
        if (x > 140) {
          window.scrollBy(-20, 0);
        } else if (x < -140) {
          window.scrollBy(20, 0);
        }
      }
      console.log("x" + x, "y" + y);
    }
    render() {
      return (
      <div className="FamMgmt"
      onMouseMoveCapture={(e)=>{this.handleScroll3(e)}}>
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

