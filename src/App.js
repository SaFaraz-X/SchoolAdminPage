import React from 'react';
import './App.css';
import './index.js'
import firebase from 'firebase';
// import firebaseConfig from './firebase.js';
import app  from './firebase';
import Student from './Student.js';



class App extends React.Component{
  constructor(props){
    super(props);

    // Get class data here
    this.schoolClass = app.database().ref('classes').child("c1/students/Sa Faraz");

    // this.something = this.schoolClass.child("students");
    // this.schoolClassData = this.schoolClass.child("c1");

    // Get teacher data here (see which teacher teaches which class)
    // this.teacher = this.schoolClassData.child('name');

    // Get adminstration data here
    this.admin = app.database().ref("admin").child('name');
    
    this.state = {
        class: "",
        admin: "",
        student: "",
        teacher: "",
        students:[{
          age: "",
          gender: ""
        }]

    }
  }

  // https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html
  // how to render multiple values from firebase
  // https://stackoverflow.com/questions/40861232/how-to-retrieve-multiple-values-in-firebase-database
  
  componentDidMount = (snap) => {
    this.schoolClass.once("value", snap => {
      this.schoolClass = app.database().ref('classes').child("c1/students/Sa Faraz")
      .once("value")
      .then(itemFiltered => console.log('Your item', itemFiltered));

      this.setState({
        students:[{
          age: snap.val(),
          gender: snap.val()
        }]
        // teacher: snap.val(),
        // student: snap.val()

        // people:{
        //   admin: snap.val(),
        //   student: snap.val(),
        //   teacher: snap.val()
        // }
      });
    });
  }

  // addClass = (e) => {

  // }

  // addTeacher = (e) => {

  // }

  // addAdmin = (e) => {

  // }

  // addStudent = (e) => {

  // }


  // favouritesFire.once("value", snapshot => {
  //   snapshot.map(item => { // it will pass through all your snapshot items
  //     firebase.database().ref(`yournode/${item.key}`) //for each item you must query again in firebase
  //     .once('value')
  //     .then(itemFiltered => console.log('Your item: ', itemFiltered); // then you get your result
  //   })
  // })

  render(){
    return(
      <div>
        <p> 
          {/* {this.state.students} */}
          <Student />
        </p>
      </div>
    )
  }
}



export default App;
