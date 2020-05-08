import React from 'react'
import {getFamilyMembers} from '../db/Queries'

class FamilyList extends React.Component {
    state={
        familyList:[]
    }
    DisplayFamilies(){
        console.log(getFamilyMembers())
    }
    render() {
      return (
      <div>
          <h1>FamilyList Here:</h1>

          <button onClick={()=>{this.DisplayFamilies()}}>Display Families</button>
          {
              
          }
      </div>)
    }
}

  export default FamilyList

