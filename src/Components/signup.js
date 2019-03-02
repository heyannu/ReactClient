import React, { Component } from 'react';
import '../Assets/css/actionplan.css';
import Nav from './navbar';
import { BrowserRouter as Route,Redirect } from "react-router-dom";
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerUser: [
                {
                    firstName: "",
                    lastName: '',
                    email: "",
                    username: "",
                    uniqueId: "",
                    password: "",
                    department: "",
                    tier: "",
                    gender: '',
                    proPic: ''
                }
            ],
            Confirmpassword: '',
            status: false,
            success: false,
            wrongpd: "none",
        }
    }
    firstname(e) {
        this.state.registerUser[0].firstName = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }
    lastname(e) {
        this.state.registerUser[0].lastName = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }
    email(e) {
        this.state.registerUser[0].email = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }
    gender(e) {
        this.state.registerUser[0].gender = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        },()=>{
        console.log(this.state.registerUser[0].gender)
        })
        
    }
    password(e) {
        this.state.registerUser[0].password = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }

    confirmpassword(e) {
        this.setState({
            Confirmpassword: e.target.value
        }, () => {
            if (this.state.registerUser[0].password != this.state.Confirmpassword) {
                this.setState({
                    wrongpd: "inline"
                })
            } else if (this.state.registerUser[0].password == this.state.Confirmpassword) {
                this.setState({
                    wrongpd: "none"
                })
            }
        })
    }

    username(e) {
        this.state.registerUser[0].username = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }
    id(e) {
        this.state.registerUser[0].uniqueId = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }
    department(e) {
        this.state.registerUser[0].department = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }

    tier(e) {
        this.state.registerUser[0].tier = e.target.value;
        this.setState({
            registerUser: this.state.registerUser
        })
    }
    show() {
        fetch('http://localhost:5000/api/auth/signup',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    registerUser: this.state.registerUser[0]
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message
                }, ()=>{
                    console.log(this.state.success, this.state.message)
                })
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(this.state.registerUser, this.state.status)
    }
    render() {
        const { success } = this.state;
        if(success){
            alert('You Are Successfully Registered. You May LogIn Now')
            return <Redirect to = {{pathname:'/signin'}}/>
        }
        return (
            <div>
                {/* <Nav /> */}
                <div className="container" id="signup">
                    <center><h3 id='heading'>Signup</h3></center>
                    <div className="row">
                        <div className="col-lg-6">
                            <div class="form-group">
                                <label for="firstname">First Name</label>
                                <input type="text" required value={this.state.registerUser[0].firstname} class="form-control" onChange={this.firstname.bind(this)} id="name" placeholder="Enter First Name" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" required value={this.state.registerUser[0].email} class="form-control" onChange={this.email.bind(this)} id="email" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="name">UserName</label>
                                <input type="text" required value={this.state.registerUser[0].username} class="form-control" onChange={this.username.bind(this)} id="name" placeholder="Enter Username" />
                            </div>
                            <div class="form-group">
                                <label for="dept">Department</label>
                                <input type="text" onChange={this.department.bind(this)} class="form-control" value={this.state.registerUser[0].department} id="dept" placeholder="Enter department" />
                            </div>
                            
                            <div class="form-group">
                                <label for="inputState">Gender</label>
                                <select id="inputState" class="form-control" onChange={this.gender.bind(this)}>
                                <option>select</option>
                                    <option value='Male' >Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div class="form-group">
                                <label for="id">Last Name</label>
                                <input type="text" required class="form-control" onChange={this.lastname.bind(this)} value={this.state.registerUser[0].lastname} id="lastname" placeholder="Enter Last name" />
                            </div>
                            <div class="form-group">
                                <label for="username">Password</label>
                                <input type="password" required value={this.state.registerUser[0].password} class="form-control" onChange={this.password.bind(this)} id="password" placeholder="Enter password" />
                            </div>
                            <div class="form-group">
                                <label for="username">Confirm Password</label>
                                <input type="password" requierd value={this.state.Confirmpassword} class="form-control" onChange={this.confirmpassword.bind(this)} id="password" placeholder="Enter password again" />
                            </div>
                            <div >
                                <h4 class="form-control" style={{ color: "rgb(219, 29, 29)", display: this.state.wrongpd }}> Passwords donot match! </h4>
                            </div>
                            <div class="form-group">
                                <label for="id">ID</label>
                                <input type="text" required class="form-control" onChange={this.id.bind(this)} value={this.state.registerUser[0].uniqueId} id="id" placeholder="Unique ID" />
                            </div>
                            <div class="form-group">
                                <label for="tier">Tier</label>
                                <input type="text" class="form-control" onChange={this.tier.bind(this)} value={this.state.registerUser[0].tier} onChange={this.tier.bind(this)} id="tier" placeholder="Enter Tier" />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-danger" onClick={this.show.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
