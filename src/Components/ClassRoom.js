import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';
// import DisplayData from './DisplayData.js';

class ClassRoom extends React.Component {

    obtainCommonData = () => {
        // const rootRef = firebase.database.ref()
        firebase.database().ref('students').on("child_added", snap => {
            // Getting the user data based on their unique key ID
            let userRef = firebase.database().ref('students/' + snap.key)
            userRef.once('value').then(userSnap =>{
                
            });
        console.log(snap.val().name)
        console.log(snap.val().class)
        console.log(snap.key)
        });

    }


    render(){
        return(
            <div>
                {this.obtainCommonData}
            </div>
        )
    }
}

export default ClassRoom;