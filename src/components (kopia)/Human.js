import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
class Human extends Component {

    // componentDidMount() {
    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
    //       .then(res => {
    //         console.log(res.data[1].name)
    //       })
    //   }
    //   axiosPost(user){
    //       console.log(user)
    //     axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    //     .then(res => {
    //       console.log(res);
    //       console.log(res.data);
    //     })
    //   }
    AddHuman(){
        console.log("human adding")
    }
render(){
    return (
        <div className="Human">
            <p>Human</p>
            <input type="text"></input>
            <button onClick={()=>{this.AddHuman("dareusz")}}>Add human</button>
        </div>

    );
}
}

export default Human