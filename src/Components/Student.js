import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';

class Student extends React.Component {
    constructor(props){
        super(props);

        this.classData = app.database();

        this.state = {
            name: "",
            age: "",
            grade: "",
            class:"",
            gender: "",
            items: []
        }
        // Bind our handleChange and handleSubmit functions
        // so that they can update everytime we utilize an element 
        // such as a button that uses the handleSubmit function
        // or an input element that uses the handleChange function
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('students');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              name: items[item].name,
              age: items[item].age,
              grade: items[item].grade,
              class: items[item].class,
              gender: items[item].gender
            });
          }
          this.setState({
            items: newState
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
          class: this.state.class,
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
          class: '',
          gender: ''
        });
      }

      
    render(){            
        return(
            <div className="StudentMain"> 
            <section className="add-item">
            <h1> Add Student to Database </h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Student Name" onChange={this.handleChange} value={this.state.name} />
                <input type="text" name="age" placeholder="Student Age" onChange={this.handleChange} value={this.state.age} />
                <input type="text" name="grade" placeholder="Student Grade" onChange={this.handleChange} value={this.state.grade} />
                <input type="text" name="class" placeholder="Student Class" onChange={this.handleChange} value={this.state.class} />
                <input type="text" name="gender" placeholder="Student Gender" onChange={this.handleChange} value={this.state.gender} />
                <button>Add Student Info</button>
            </form>

            </section>

            <section className='display-item'>
                <h1> Student Database Information </h1>
                <div className="wrapper">
                    {this.state.items.map((item) => {
                        return (
                            <li key={item.id}>
                                <p>{"name:" + " " + item.name}</p>
                                <p> {"age:" + " " + item.age}</p>
                                <p> {"grade:" + " " + item.grade}</p>
                                <p> {"classroom:" + " " + item.class}</p>
                                <p> {"gender:" + " " + item.gender}</p>
                            </li>
                        )
                    })}
                </div>
            </section>

            </div>


        )

    }
}

export default Student;