import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';
// import DisplayData from './DisplayData.js';

class Admin extends React.Component {
    constructor(props){
        super(props);

        this.adminData = app.database();

        this.state = {
            name: "",
            position: "",
            elements: []
        }

        this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
        this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
    }

    // componentDidMount = () => {
    //     const dataRef = firebase.database().ref('teachers');
    //     dataRef.on('value', (snapshot) => {
    //         let elements = snapshot.val();
    //         let newState = [];
    //         for(let element in elements) {
    //             newState.push({
    //                 id: element,
    //                 name: elements[element].name,
    //                 age: elements[element].age,
    //                 grade: elements[element].grade,
    //                 gender: elements[element].gender
    //             });
    //         }
    //         this.setState({
    //             elements: newState
    //         });
    //     });
    // }

    handleChangeAdmin = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      handleSubmitAdmin = (e) => {
          // I believe 'preventDefault()' allows our data to update
          // once we click the 'submit' button without refreshing
          // the whole web page
        e.preventDefault();
        // Here we are creating a new reference called "teachers"
        const adminRef = firebase.database().ref('admins');
        const admin = {

          name: this.state.name,
          position: this.state.position,
        }

        adminRef.push(admin);
        // Set all of our key values back to empty values so we can
        // input new values
        this.setState({
          name: '',
          position: '',
        });
      }

      
    render(){            
        return(
            <div className="AdminMain"> 
            <section className="add-item-main">

            <form onSubmit={this.handleSubmitAdmin}>
                <input type="text" name="name" placeholder="Admin Name" onChange={this.handleChangeAdmin} value={this.state.name} />
                <input type="text" name="position" placeholder="Admin Position" onChange={this.handleChangeAdmin} value={this.state.position} />
                <button>Add Admin Info</button>
            </form>

            </section>

            {/* <DisplayData dataVal = {this.state.elements}/> */}
            </div>


        )

    }
}

export default Admin;