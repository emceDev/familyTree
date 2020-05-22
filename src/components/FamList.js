import React from 'react'
import Member from './Member'
import AddMember from './AddMember'
import {app} from '../db/Config'
class FamList extends React.Component {
    state={
        membersList:null
    }
    componentDidMount(){
        this.checkIfEmpty()
        //get family members
    }
    //members array settings
    checkIfEmpty(){
        const members = app.database().ref('/families/' +this.props.famKey +'/memKeys/')

        members.on('value',snap => {
            var membersArray=[]

            if (snap.val() === null){
                console.log("Fam list empty" + snap.val())
            }else{
                snap.val().map(member => {
                    membersArray.push(member)
                })
                this.setState({membersList:membersArray})
            }
        }
            )}
            
    
    render() {
      return (
      <div 
      style={{display:"flex",flexDirection:'column'}}
      >
          <h1>
            FamilyList
          </h1>
        {
        this.state.membersList === null 
            ?
            setTimeout(() => {
                    return(
                        <AddMember 
                        famKey={this.props.famKey}
                        />
                    )
                }, 1000):
            <Member 
            key={this.state.membersList[this.state.membersList.length-1]} 
            memKey={this.state.membersList[this.state.membersList.length-1]} 
            famKey={this.props.famKey}
            />
        }
      </div>)
    }
}

  export default FamList

