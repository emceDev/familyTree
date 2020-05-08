import React from 'react'
import {displayPerson} from '../db/Queries'
class Person extends React.Component {
    state={ 
    }

    handleChange(event){
        this.setState({name:event.target.value})
    }
    render() {
      return (
      <div>
          
      </div>)
    }
}

  export default Person

