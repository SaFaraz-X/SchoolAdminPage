import React from 'react';
import './App.css';
import './index.js'
import firebase from 'firebase';
import app  from './firebase';

class Student extends React.Component {
    constructor(props){
        super(props);

        this.classData = app.database();

        this.state = {
            name: "",
            age: "",
            grade: "",
            gender: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      handleSubmit = (e) => {
        e.preventDefault();
        const dataRef = firebase.database().ref('students');
        const student = {
          name: this.state.name,
          age: this.state.age,
          grade: this.state.grade,
          gender: this.state.gender
        }
        dataRef.push(student);
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
            </div>
        )
    }
}

export default Student;