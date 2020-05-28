import React from 'react';
import './App.css';
import './index.js'
import firebase from 'firebase';
// import firebaseConfig from './firebase.js';
import app  from './firebase';

class Student extends React.Component {
    constructor(props){
        super(props);
        this.schoolClass = app.database().ref('classes').child("c1/students");
        this.state = {
            studentList: [],
            student: "" [{
                age: "",
                gender: ""
            }]
        }

        this.inputStudent = this.inputStudent.bind(this);
        this.inputAge = this.inputAge.bind(this);
        this.inputGender = this.inputGender.bind(this);
        this.addStudent = this.addStudent.bind(this);
    }

    // Input the student's information in the textbox
    inputStudent = (e) => {
        let studentVal = e.target.value;
        this.setState({
            student: studentVal
        })
    }

    inputAge = (e) => {
        let studentAge = e.target.value;
        this.setState({
            student: [{
                age: studentAge
            }]
        })
    }
    inputGender = (e) => {
        let studentGender = e.target.value;
        this.setState({
            student: [{
                gender: studentGender
            }]
        })
    }

    // Add the student's information to the database
    addStudent = (e) => {
        let newStudent = this.state.student;
        if(newStudent !== "" && newStudent.age !== "" && newStudent.gender != ""){
            this.schoolClass.push(this.state.student);
            this.setState({
                student: "" [{
                    age: "",
                    gender: ""
                }]
            })
        }

    }

    render(){
        return(
            <div className="StudentMain"> 

                <input type="text" id="textArea" value={this.state.student}  onChange={e=>this.inputStudent(e)}> 
                </input>
{/* 
                <input type="text" id="textArea" value={this.state.student.age}  onChange={e=>this.inputAge(e)}> 
                </input>

                <input type="text" id="textArea" value={this.state.student.gender}  onChange={e=>this.inputGender(e)}> 
                </input> */}

                <button type="submit" onClick={()=>this.addStudent()}>
                    Add Student
                </button>

            </div>
        )
    }
}

export default Student;