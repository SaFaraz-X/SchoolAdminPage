import React from 'react';
import '../App.css';
import '../index.js'
import firebase from 'firebase';
import app  from '../firebase';

class Admin extends React.Component {
    constructor(props){
        super(props);

        this.adminData = app.database();

        this.state = {
            name: "",
            position: "",
            items: []
        }

        this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
        this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('admins');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              name: items[item].name,
              position: items[item].position
            });
          }
          this.setState({
            items: newState
          });
        });
      }

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
            <h1> Add Admin to Database </h1>
            <form onSubmit={this.handleSubmitAdmin}>
                <input type="text" name="name" placeholder="Admin Name" onChange={this.handleChangeAdmin} value={this.state.name} />
                <input type="text" name="position" placeholder="Admin Position" onChange={this.handleChangeAdmin} value={this.state.position} />
                <button>Add Admin Info</button>
            </form>
            </section>

            <section className='display-item'>
                <h1> Admin Database Information </h1>
                <div className="wrapper">
                    {this.state.items.map((item) => {
                        return (
                            <li key={item.id}>
                                <p>{"name:" + " " + item.name}</p>
                                <p> {"classroom:" + " " + item.position}</p>
                            </li>
                        )
                    })}
                </div>
            </section>
            </div>


        )

    }
}

export default Admin;