import React from 'react';
import './App.css';
import './index.js'
import firebase from 'firebase';
import app  from './firebase';
import Student from './Components/Student.js';
import Teacher from './Components/Teacher.js';
import Admin from './Components/Admin.js';
import ClassRoom from './Components/ClassRoom.js';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    // LINK: https://www.reddit.com/r/Firebase/comments/cpcdot/can_we_iterate_through_unique_keys_to_retrieve/


    // admin.database().ref('orders').on("child_added", snap => {
    //   console.log(snap.val().name)
    //   console.log(snap.val().quantity)
    //   console.log(snap.key)
    //   });

  render(){
    return(
      <div>
        <p> 
          <Student />
          <Teacher />
          <Admin />
        </p>
      </div>
    )
  }
}

export default App;
