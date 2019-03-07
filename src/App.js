import React, { Component } from 'react';
import Home from './Components/homepage';
import Signin from './Components/signin';
import Signup from './Components/signup';
import ActionPlan from './Components/actionplans';
import UserDashboard from './Components/user_dashboard';
import AdminDashboard from './Components/adminDashboard';
import Nav from './Components/navbar';
import Status from './Components/status';
import Contact from './Components/contact'
import UserAccess from './Components/userAccess';
import Edituser from './Components/editUser';
import VerifyUser from './Components/VerifyUser';
import GrantAp from './Components/grantAP';
import Archive from './Components/ArchiveMOM'
import Reroute from './Components/reroute';
import{ BrowserRouter as Router,Route, Redirect } from "react-router-dom";
import About from './Components/about';
import Target from './Components/target';

// import UserAccess from './Components/userAccess';
class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Nav />
      <Route exact path='/' component={Home}/>
      <Route exact path='/signup' component={Signup}/> 
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/actionplan' component={ActionPlan}/> 
      <Route exact path='/archive' component={Archive}/> 
      <Route exact path='/about' component={About}/> 
      <Route exact path='/status' component={Status}/> 
      <Route exact path="/user_dashboard" component={UserDashboard}/>
      <Route exact path="/admin_dashboard" component={AdminDashboard}/>
      <Route exact path="/grant_ap" component={GrantAp}/>
      <Route exact path="/logout" component={Reroute}/>
      <Route exact path='/edituser' component ={Edituser}/>
      <Route exact path="/user_access" component={UserAccess}/>
      <Route exact path="/verify/:userId" component={VerifyUser}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path='/target' component={Target}/>
      </div>
      </Router>
    )
  }
}

// const token = localStorage.getItem('jwt-tok')
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={ props =>  (token && token.length > 0 )? 
//     ( <Component {...props} /> ) : ( <Redirect to={{ pathname: "/signin"}} /> )
//     }
//   />
// );

export default App;