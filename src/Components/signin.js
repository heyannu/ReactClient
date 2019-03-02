import React, { Component } from 'react';
import '../Assets/css/actionplan.css';
import { BrowserRouter as Route,Redirect } from "react-router-dom";

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: [
                {
                    email: "",
                    password: ""
                }
            ],
            value: true,
            UserInfo:[],
            type: "password",
            success: false,
            message: ''
        }
    }
    email(e) {
        this.state.User[0].email = e.target.value;
        this.setState({
            User: this.state.User
        })
    }
    password(e) {
        this.state.User[0].password = e.target.value;
        this.setState({
            User: this.state.User
        })
    }
    showPassword(e) {
        this.setState({
            value: !this.state.value
        })
        if (this.state.value == true) {
            this.setState({ type: "text" });
        }
        else {
            this.setState({
                type: 'password'
            })
        }
        console.log(this.state.User[0])
    }
    submit(e) {
        e.preventDefault()
        fetch('http://localhost:5000/api/auth/signin',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: this.state.User[0]
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                localStorage.setItem('jwt-tok', responseJson.token);
                alert(responseJson.message)
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message,
                    UserInfo:responseJson
                },()=>{
            console.log(this.state.UserInfo)

                })})
            .catch((error) => {
                console.error(error);
            });
          
       }
       render() {
        const { success, UserInfo  } = this.state;
        const token = localStorage.getItem('jwt-tok')
        if(token && token.length > 0){
            
            if(UserInfo.isAdmin){
                alert('admin')
                window.location.reload();
            return <Redirect to = {{pathname:'/admin_dashboard', 
            state:{
                  User:this.state.UserInfo  
            }}}/>
            }
            else{
                alert('user')
                window.location.reload();
                return <Redirect to = {{pathname:'/user_dashboard', 
                state:{
                      User:this.state.UserInfo  
                }}}/>

            }
        }
        return (
            <div>
                {/* <Nav /> */}
                <div>
                    <div className="row">
                        <div className="col-lg-6" id="welcome">
                            <div className="container" id="text"><hr /><h2>WELCOME</h2><hr /></div>
                        </div>
                        <div className="col-lg-6" id="form">
                            <div class="container" id="signin">
                                <div class="form-group">
                                    <h3>LOGIN</h3>
                                    <label for="exampleInputEmail1" className="email">Email address</label>
                                    <input type="email" onChange={this.email.bind(this)} class="form-control inputs" required aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <label for="password" className="email">Password</label>
                                    <input class="password" onChange={this.password.bind(this)} className="form-control inputs" required placeholder="Enter password" type={this.state.type} />
                                    <div class="hide-show">
                                        <input type="checkbox" onClick={this.showPassword.bind(this)} value={!this.state.value}></input><span className="email" >Show password</span>
                                    </div>
                                </div>
                                <button type="submit" onClick={this.submit.bind(this)} class="btn btn-primary form-control inputs">Submit</button>
                                <hr />
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
