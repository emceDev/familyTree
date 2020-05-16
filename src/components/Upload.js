import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from '@material-ui/core'
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
                <Button 
                variant="outlined"
                onClick={this.uploadWidget.bind(this)} 
                className="upload-button"
                >
                    Add Image
                </Button>
            </div>
        </div>

    );
}
}

export default Upload