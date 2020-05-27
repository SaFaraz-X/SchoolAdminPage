import React from 'react';
import './App.css';
import './index.js'
import firebase from 'firebase';
// import firebaseConfig from './firebase.js';
import app  from './firebase';



class App extends React.Component{
  constructor(props){
    super(props);

    // Get class data here
    this.schoolClass = app.database().ref('classes').ref('c1').child("name");
    this.schoolClassData = this.schoolClass.child("c1");

    // Get teacher data here (see which teacher teaches which class)
    this.teacher = this.schoolClassData.child('name');

    // Get adminstration data here
    this.admin = app.database().ref("admin").child('name');
    
    this.state = {
        class: "",
        admin: "",
        student: "",
        teacher: ""

    }
  }

  componentDidMount = (snap) => {
    this.schoolClass.on("value", snap => {
      this.setState({
        teacher: snap.val(),
        student: snap.val()

        // people:{
        //   admin: snap.val(),
        //   student: snap.val(),
        //   teacher: snap.val()
        // }
      });
    });
  }

  render(){
    return(
      <div>
        <p> 
          {this.state.teacher}
        </p>
      </div>
    )
  }
}



export default App;
