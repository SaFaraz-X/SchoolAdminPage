import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';
// import DisplayData from './DisplayData.js';

class Teacher extends React.Component {
    constructor(props){
        super(props);

        this.teacherData = app.database();

        this.state = {
            name: "",
            class: "",
            elements: []
        }

        this.handleChangeTeacher = this.handleChangeTeacher.bind(this);
        this.handleSubmitTeacher = this.handleSubmitTeacher.bind(this);
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

    handleChangeTeacher = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      handleSubmitTeacher = (e) => {
          // I believe 'preventDefault()' allows our data to update
          // once we click the 'submit' button without refreshing
          // the whole web page
        e.preventDefault();
        // Here we are creating a new reference called "teachers"
        const teacherRef = firebase.database().ref('teachers');
        const teacher = {

          name: this.state.name,
          class: this.state.class,
        }

        teacherRef.push(teacher);
        // Set all of our key values back to empty values so we can
        // input new values
        this.setState({
          name: '',
          class: '',
        });
      }

      
    render(){            
        return(
            <div className="TeacherMain"> 
            <section className="add-item-teacher">

            <form onSubmit={this.handleSubmitTeacher}>
                <input type="text" name="name" placeholder="Teacher Name" onChange={this.handleChangeTeacher} value={this.state.name} />
                <input type="text" name="class" placeholder="Teacher's Classroom Number" onChange={this.handleChangeTeacher} value={this.state.class} />
                <button>Add Teacher Info</button>
            </form>

            </section>

            {/* <DisplayData dataVal = {this.state.elements}/> */}
            </div>


        )

    }
}

export default Teacher;