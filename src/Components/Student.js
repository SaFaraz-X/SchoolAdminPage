import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';
// import DisplayData from './DisplayData.js';

class Student extends React.Component {
    constructor(props){
        super(props);

        this.classData = app.database();

        this.state = {
            name: "",
            age: "",
            grade: "",
            gender: "",
            elements: []
        }
        // Bind our handleChange and handleSubmit functions
        // so that they can update everytime we utilize an element 
        // such as a button that uses the handleSubmit function
        // or an input element that uses the handleChange function
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        const dataRef = firebase.database().ref('students');
        dataRef.on('value', (snapshot) => {
            let elements = snapshot.val();
            let newState = [];
            for(let element in elements) {
                newState.push({
                    id: element,
                    name: elements[element].name,
                    age: elements[element].age,
                    grade: elements[element].grade,
                    gender: elements[element].gender
                });
            }

            this.setState({
                elements: newState
            });
        });
    }

    handleChange = (e) => {
        this.setState({
            // The "name" in e.target.name refers to 'name'
            // in our input elements under render()
            // Example: <input type="text" name="grade" placeholder="Student Grade" onChange={this.handleChange} value={this.state.grade} />
            // In the example above, the 'name' variable contains our key
            // 'age'
          [e.target.name]: e.target.value
        });
      }

      handleSubmit = (e) => {
          // I believe 'preventDefault()' allows our data to update
          // once we click the 'submit' button without refreshing
          // the whole web page
        e.preventDefault();
        // Here we are creating a new reference called "students"
        const dataRef = firebase.database().ref('students');
        const student = {
            // Inside our 'students' object, we are putting in the keys
            // 'name', 'age', 'grade', and 'gender' along with their values
            // from the above method 'handleChange'
          name: this.state.name,
          age: this.state.age,
          grade: this.state.grade,
          gender: this.state.gender
        }
        // Push the object 'student' to the dataRef variable
        // Remember that the dataRef variable creates a reference to 
        // the 'students' object in our database
        dataRef.push(student);
        // Set all of our key values back to empty values so we can
        // input new values
        this.setState({
          name: '',
          age: '',
          grade: '',
          gender: ''
        });
      }

      
    render(){            
        return(
            <div className="StudentMain"> 
            <section className="add-item">

            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Student Name" onChange={this.handleChange} value={this.state.name} />
                <input type="text" name="age" placeholder="Student Age" onChange={this.handleChange} value={this.state.age} />
                <input type="text" name="grade" placeholder="Student Grade" onChange={this.handleChange} value={this.state.grade} />
                <input type="text" name="gender" placeholder="Student Gender" onChange={this.handleChange} value={this.state.gender} />
                <button>Add Item</button>
            </form>

            </section>

            {/* <DisplayData dataVal = {this.state.elements}/> */}
            </div>


        )

    }
}

export default Student;