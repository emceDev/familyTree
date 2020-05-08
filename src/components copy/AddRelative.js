import React from 'react'
import {app} from '../db/Config'
class AddRelative extends React.Component {
    state={
        memKey:"",
        famKey:[],
        name:"",
        children:[],
        siblings:[],
        parent:[],
        partner:'',
        type:null
    }
    componentDidMount(){
        this.setState({famKey:this.props.famKey, type:this.props.type})
        if(this.props.type==='/children/')
        {
          this.setState({parent:this.props.relKey})
          console.log(this.props.type)
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
      const memKey = app.database().ref('/members/').push().key
      this.setState({memKey:memKey})
      setTimeout(() => {
        const relKeys = app.database().ref('/members/'+ this.props.relKey + this.state.type)

        var relKeysArray=[]
        relKeys.once('value',snap => {
          console.log("czysty snap: "+snap.val())
                if(snap.val()===null){
                  relKeysArray.push(memKey)
                }else{
                  var x = snap.val()
                  relKeysArray.push(x)
                  relKeysArray.push(memKey)
                  console.log("snap val: "+x)
                  console.log("relKeysArray after push: "+relKeysArray)
                  // relKeysArray.push(snap.val())
                  // console.log("relkesy: after snap"+relKeysArray)
                  // relKeysArray.push(this.state.memKey)
                  // console.log("relkeys member+snap"+relKeysArray)
                  // // console.log(relKeysArray)
                }
                var objectArray = Object.values(relKeysArray)
                console.log("last relKeys: "+Object.values(relKeysArray))
                relKeys.set(objectArray)
              })
  
        const famKeys = app.database().ref('/families/'+ this.props.famKey + '/memKeys/')
            var famKeysArray=[this.state.memKey,]
          famKeys.once('value',snap=>{
            if(snap.val().length >= 1){
              snap.val().map(key=>{
              famKeysArray.push(key)})
            }else{
              console.log("pierwsze dane")
            }
            famKeys.set(famKeysArray)
              })
      }, 30);
            
      setTimeout(() => {
          app.database().ref('members/' + this.state.memKey + '/').update(this.state)
      }, 2000);
    }
    render() {
      return (
      <div>
          <input placeholder="name" onChange={(e)=>this.setState({name:e.target.value})}></input>
          <button onClick={()=>{this.PostMember()}}>PostMember</button>
      </div>)
    }
}

  export default AddRelative

