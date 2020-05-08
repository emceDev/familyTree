import React from 'react'
import {getFamilyMembers} from '../db/Queries'
import PersonCreation from './PersonCreation'

class AddMember extends React.Component {
    state={
        familyKey:"x"
    }
    render() {
      return (
      <div>
          <h1>AddMember to family</h1>
          <PersonCreation/>
      </div>)
    }
}

  export default AddMember

