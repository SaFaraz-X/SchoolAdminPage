import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';

class Teacher extends React.Component {
    constructor(props){
        super(props);

        this.teacherData = app.database();

        this.state = {
            name: "",
            class: "",
            items: []
        }

        this.handleChangeTeacher = this.handleChangeTeacher.bind(this);
        this.handleSubmitTeacher = this.handleSubmitTeacher.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('teachers');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              name: items[item].name,
              class: items[item].class
            });
          }
          this.setState({
            items: newState
          });
        });
      }

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

        teacherRef.on('value', (snapshot) => {
            console.log("hi");
            console.log(snapshot.val());
          });
      }

      
    render(){            
        return(
            <div className="TeacherMain"> 
            <section className="add-item-teacher">
            <h1> Add Teacher to Database </h1>
            <form onSubmit={this.handleSubmitTeacher}>
                <input type="text" name="name" placeholder="Teacher Name" onChange={this.handleChangeTeacher} value={this.state.name} />
                <input type="text" name="class" placeholder="Teacher's Classroom Number" onChange={this.handleChangeTeacher} value={this.state.class} />
                <button>Add Teacher Info</button>
            </form>

            </section>

            <section className='display-item'>
                <h1> Teacher Database Information </h1>
                <div className="wrapper">
                    {this.state.items.map((item) => {
                        return (
                            <li key={item.id}>
                                <p>{"name:" + " " + item.name}</p>
                                <p> {"classroom:" + " " + item.class}</p>
                            </li>
                        )
                    })}
                </div>
            </section>
            </div>


        )

    }
}

export default Teacher;