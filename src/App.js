import React from 'react';
import './App.css';
import './index.js'
import firebase from 'firebase';
import app  from './firebase';
import Student from './Student.js';



class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

  render(){
    return(
      <div>
        <p> 
          <Student />
        </p>
      </div>
    )
  }
}

export default App;
