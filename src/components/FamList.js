import React from 'react'
import Member from './Member'
import AddMember from './AddMember'
import {app} from '../db/Config'
import { Parallax, Background } from 'react-parallax';
class FamList extends React.Component {
    state={
        membersList:null,
        vw:'',
        vh:'',
        previewMode:true
    }
    componentDidMount(){
        this.checkIfEmpty()
        this.setState({vw:window.innerWidth,vh:window.innerHeight})
        //get family members
    }
    //members array settings
    checkIfEmpty(){
        const members = app.database().ref('/families/' + this.props.famKey +'/memKeys/')

        members.on('value',snap => {
            var membersArray=[]

            if (snap.val() === null){
                this.setState({membersList:null})
            }else{
                snap.val().map(member => {
                    membersArray.push(member)
                })
                this.setState({membersList:membersArray})
            }
        }
            )}
    previewMode(){
        this.setState({previewMode:!this.state.previewMode})
        const x = document.getElementsByClassName("FamList")[0].style
        console.log(x)
    }
    render() {
      return (
      <div 
      className="FamList"
      >
        <Parallax
            blur={{ min: -15, max: 20 }}
            bgImage={require('../images/bark.jpg')}
            bgImageAlt="the cat"
            strength={500}
        >
          <h1>
            FamilyList
          </h1>
          <button onClick={()=>{this.previewMode()}}>Preview mode</button>
        {
        this.state.membersList === null 
            ? <AddMember 
            famKey={this.props.famKey}
            />
            :<Member 
            key={this.state.membersList[this.state.membersList.length-1]} 
            memKey={this.state.membersList[this.state.membersList.length-1]} 
            famKey={this.props.famKey}
            />
        }
        </Parallax>
      </div>)
    }
}

  export default FamList

