import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Emblem from '../Assets/images/emblem.png';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: '',
      jwt_tok: 0,
      User: {},
      loggedin:false,
      admin:'none',
      user:'none',
      login:'none'
    }
  }
  componentDidMount(){
    const token = localStorage.getItem('jwt-tok');
    if(token != null) {
      const decoded = jwt_decode(token);
      if(decoded.isAdmin){
      this.setState({
          admin:'inline',
          login: 'inline',
          User:decoded
        })
      }
      else {
        this.setState({
          user:'inline',
          login: 'inline',
          User:decoded
        })
      }
    }
  }
  logout(e) {
    localStorage.clear();
    this.setState({
      jwt_tok: 1
    })
  }
  render() {
    const token = localStorage.getItem('jwt-tok');
    const { jwt_tok } = this.state;
    if (jwt_tok == 1) {
      return <Redirect to={{ pathname: '/logout' }} />
    }
    
    return (
      <div>
        <div>
          <nav className='navbar navbar-expand navA'>
            <img src={Emblem} alt='Emblem' />
            <p>Department Of Industrial Policy And Promotion</p>
          </nav>
        </div>

        <nav className='navbar nabvar-expand navB'>
          <ul className="nav  left">
            <li>
              <Link className='nav-link' to='/'><button type="button" className="btn btn-outline-light nabtn">Home</button></Link>
            </li>
            <li>
              <Link style={{display:this.state.login}} className='nav-link' to='/actionplan'><button type="button" style={{marginTop:'8.5px'}} className="btn btn-outline-light nabtn">ActionPlan</button></Link>
            </li>
            <li>
              <Link style={{display:this.state.login}} className='nav-link' to='/archive'><button type="button" style={{marginTop:'8.5px'}} className="btn btn-outline-light nabtn">Archive</button></Link>
            </li>
            <li>
              <Link className='nav-link' to='/about'><button type="button" className="btn btn-outline-light nabtn">About</button></Link>
            </li>
            <li>
              <Link className='nav-link' to='/contact'><button type="button" className="btn btn-outline-light nabtn">Contact</button></Link>
            </li>
          </ul>

          
          <ul className="nav  right">
           <li style={{display:this.state.admin}}>
              <Link className='nav-link' to={{ pathname: '/admin_dashboard', state:{ User:this.state.User }}}><button style={{width:'11em'}} type="button" className="btn btn-outline-light nabtn">Admin Dashboard</button></Link>
            </li>
            <li style={{display:this.state.user}}>
              <Link className='nav-link' to={{ pathname: '/user_dashboard', state:{ User:this.state.User }}}><button style={{width:'11em'}} type="button" className="btn btn-outline-light nabtn">User Dashboard</button></Link>
            </li>
            {

              (!(token && token.length > 0)) ?
                <li>
                  <Link className='nav-link' to='/signin'><button type="button" className="btn btn-outline-light nabtn">Login</button></Link>
                </li> :
                <li>
                  <button type="button" className="btn btn-danger nabtn" style={{marginTop:'8.5px'}} onClick={this.logout.bind(this)} >Logout</button>
                  {/* <a className="nav-link active" href="/signin"><button type="button" class="btn btn-outline-light nabtn">Login</button></a> */}
                </li>
            }
          </ul>
        </nav>

      </div>
    )
  }
}