import React from 'react'
import AddRelative from './AddRelative'
import {app} from '../db/Config'
import Card from 'react-bootstrap/Card'
import {Image} from 'cloudinary-react';

class Partner extends React.Component{
        state={
            memKey:null,
            name:null,
            partner:null,
        }
        componentDidMount(){
            const memData = app.database().ref('/members/' + this.props.memKey)
            setTimeout(() => {
                memData.on('value',snap => {
                    var data = snap.val()
                    !!snap.val() ?
                        this.setState({
                            memKey:this.props.memKey,
                            name:data.name,
                            partner:data.partner,
                            children:data.children,
                            siblings:data.siblings,
                            type:data.type}):
                            console.log("no data at that")
                    })  
            }, 50);
        }
    render(){
        return(
            <Card>
                <Image cloudName="m4t1ce" 
                publicId={this.props.famKey+"/"+"-M6_JNuuyDv40cjhXvRC"} >
                </Image>
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                </Card.Body>
            </Card>
        )
    }
}
export default Partner