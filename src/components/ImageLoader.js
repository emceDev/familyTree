import React, { Component } from "react";
import ReactDOM from "react-dom";

class ImageLoader extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const response = await fetch(`https://res.cloudinary.com/m4t1ce/image/upload/c_scale,h_150,w_130/v1589569855/default_ts45ax.jpg`);

  }

  render() {
    return (
      <div>
        {/* <ul>
          {this.state.data.map(el => (
              <img src={el} alt="xd"></img>
          ))} */}
        {/* </ul> */}
      </div>
    );
  }
}

export default ImageLoader;