import React from 'react';
import './App.css';
import './index.js'
import firebase, {auth, provider} from './firebase.js';
import app  from './firebase';
import Student from './Components/Student.js';
import Teacher from './Components/Teacher.js';
import Admin from './Components/Admin.js';
import ClassRoom from './Components/ClassRoom.js';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          user: null
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

  
  componentDidMount = () => {
    // 'onAuthStateChanged' is a method we import from
    // the 'auth' module that allows the Firebase database
    // to check if the user was already previously authenticated
    // everytime the browser refreshes, thus making sure the
    // user is not forcefully logged out
    auth.onAuthStateChanged((user) => {
      if(user){
        this.setState({
          user
        });
      }
    });
  }



  logout = () => {
    // 'signOut' is a function from the 'auth' module
    // that we imported from Firebase. Set the user's value
    // back to null
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login = () => {
    // 'signInWithPopup' is a function from the 'auth' module
    // that we imported from Firebase. The parameter 'provider' is
    // the provider we enabled for our database (Google)
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render(){
    return(
      <div className='app'>

        <div className="wrapper">
          <h1>Martin Luther King Elementary School</h1>
          {/* If this.state.user is null or false, then the user will see the 'Log In' button because they
          are not a user on thr website, if they are a user then when they click the Log In button, the user
          will see the 'Log Out' button on the website*/}
          {this.state.user ? // Ternary operator
            <button onClick={this.logout}>Log Out</button>                
            :
            <button onClick={this.login}>Log In</button>              
          }
        </div>

        {/* Below we are checking if the person is a valid user
        (if they're logged in) and if true, then we display all access
        to the school's database otherwise they get the message
        "You must be logged in to view this information" */}
        {this.state.user ? 
        <p> 
          <Student />
          <Teacher />
          <Admin />
        </p>
      :
      <div className='wrapper'>
          <p> You must be logged in to view this information </p>
      </div>
        }
    </div>
    )
  }
}

export default App;
