import React from 'react'
import {app} from '../db/Config'
import Upload from './Upload'
class AddRelative extends React.Component {
    state={
        memKey:"",
        famKey:[],
        name:"",
        children:[],
        siblings:[],
        parent:[],
        partner:null,
        type:null
    }
    componentDidMount(){
      const memKey = app.database().ref('/members/').push().key
      this.setState({memKey:memKey})
        this.setState({famKey:this.props.famKey, type:this.props.type})
        if(this.props.type==='/children/')
        {
          this.setState({parent:this.props.relKey})
        }
        else if(this.props.type === '/partner/')
        {
          this.setState({partner:this.props.relKey})
        }
        else if(this.props.type === '/siblings/')
        {
          var siblingsArray = [this.props.relKey]
          this.setState({siblings:siblingsArray})
        }
    }
  
    PostMember(){
      this.props.notify(null)
      setTimeout(() => {
        const relKeys = app.database().ref('/members/'+ this.props.relKey + this.state.type)
        var relKeysArray=[]
        relKeys.once('value',snap => {
          console.log("SNAAAAAPPP"+snap.val())
                if(snap.val()===null||!!snap.val===false){
                  console.log("Nill or trie")
                  relKeysArray.push(this.state.memKey)
                }
                else{
                  var x = snap.val()
                  x.map(z=>{
                    relKeysArray.push(z)
                  })
                  relKeysArray.push(this.state.memKey)
                  console.log("snap val: "+ x)
                  console.log("relKeysArray after push: "+ relKeysArray)
                }
                var objectArray = Object.values(relKeysArray)
                console.log("last relKeys: "+ Object.values(relKeysArray))
                relKeys.set(objectArray)
              })
  //Get new key for user
        const famKeys = app.database().ref('/families/'+ this.props.famKey + '/memKeys/')
            var famKeysArray=[this.state.memKey,]
          famKeys.once('value',snap=>{
            if(!!snap.val()){
              snap.val().map(key=>{
              famKeysArray.push(key)})
            }else{
              console.log("pierwsze dane")
            }
            famKeys.set(famKeysArray)
              })
      }, 30);
// add to members
      setTimeout(() => {
          app.database().ref('members/' + this.state.memKey + '/').update(this.state)
      }, 2000);

    }
    render() {
      return (
      <div>
          <Upload memKey={this.state.memKey} famKey={this.props.famKey}/>
          <input placeholder="name" onChange={(e)=>this.setState({name:e.target.value})}></input>
          <button onClick={()=>{this.PostMember()}}>PostMember</button>
      </div>)
    }
}

  export default AddRelative

