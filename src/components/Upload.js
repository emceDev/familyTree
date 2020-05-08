import React, { Component } from 'react';
import { render } from 'react-dom';

class Upload extends Component {
uploadWidget() {
    window.cloudinary.openUploadWidget({ 
    cloud_name: 'm4t1ce', 
    upload_preset: 'unsigned1', 
    public_id:this.props.famKey+"/"+this.props.memKey},
        function(error, result) {
        });
}

render(){
    return (
        <div className="main">
            <div className="upload">
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                    Add Image
                </button>
            </div>
        </div>

    );
}
}

export default Upload