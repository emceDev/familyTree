import React from 'react'
import firebase from 'firebase'
import {firebaseConfig} from '../db/Config'
// create family=>congrats=>addMemberComp{choose family}=>addId=>ezpz
// const app = firebase.initializeApp(firebaseConfig)

class FamilyCreation extends React.Component {
    state={
        id:"",
        name:"",
        membersId:[]     
    }

    postFamily(){
        const familyId = app.database().ref().child('families').push().key
        this.setState({id:familyId})
        return(app.database().ref('families/'+familyId).update(this.state))
    }

    handleChange(event){
        this.setState({name:event.target.value})
    }
    componentDidMount(){

    }
    render() {
      return (<div>
          <h1>Insert Family</h1>
          <input type="text" placeholder="familyname" onChange={(event)=>this.handleChange(event)}></input>
          <button onClick={()=>this.postFamily()}>CreateFamily</button>
      </div>)
    }
}
  
class MemberAddition extends React.Component{
    state={
        id:"",
        name:"",
        familyId:""
    }
    setFamilyId(e){
        this.setState({familyId:e.target.id})
    }
    handleChange(e){
        this.setState({name:e.target.value})
    }
    componentDidMount(){
        const memberId = app.database().ref().child('members').push().key
        this.setState({id:memberId})
    }
    postMember(){
        const memberId = app.database().ref().child('members').push().key
        this.setState({id:memberId})
        return(app.database().ref('members/'+memberId).update(this.state))
    }
    render(){
        return(
            <div>
                <h1>Add member</h1>
                <input type="text" placeholder="name" onChange={(e)=>this.handleChange(e)}></input>
                <button onClick={()=>{this.postMember()}}>PostMemberTodB</button>
                <h2>Choose Fam</h2>
                <DisplayFamilies setFamilyId={(e)=>this.setFamilyId(e)}/>
            </div>
        )
    }
}
class DisplayFamilies extends React.Component {
    state={
        families:[]
    }
    componentDidMount(){
        const getFamilies = app.database().ref('/families')
        getFamilies.on('value',snap => {
            var x = snap.val()
            var z = Object.values(x)
            this.setState({families:z})
            })}
    render() {
      return (
      <div 
        onClick={this.props.setFamilyId} 
        style={{display:this.props.display,margin:"0 auto",
        flexDirection:"column"
      }}>
          {
              this.state.families.map(family=>{
                  return(
                  <li key={family.id} id={family.id}>{family.name}</li>
                  )
              })
          }
      </div>)
    }
}
class DisplayMembers extends React.Component {
    state = {
        members:[]
    }
    componentDidMount(){
        const getMembers = app.database().ref('/members')
        getMembers.on('value',snap => {
            var x = snap.val()
            var z = Object.values(x)
            this.setState({members:z})
            })}
    render(){
        return (
            <div 
            //   onClick={this.props.setFamilyId} 
              style={{display:this.props.display,margin:"0 auto",
              flexDirection:"column"
            }}>
            <h3>MemberList</h3>
                {
                    this.state.members.map(member=>{
                        return(
                        <li key={member.id} id={member.id}>{member.name}</li>
                        )
                    })
                }
            </div>)
    }
}
class FamAndMembersCreation extends React.Component {
    render() {
      return <div>
          <FamilyCreation/>
          <MemberAddition/>
          <DisplayMembers/>
      </div>;
    }
}

export default FamAndMembersCreation