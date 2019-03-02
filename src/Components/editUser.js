import React, { Component } from 'react';
import { BrowserRouter as Route, Link,Redirect } from "react-router-dom";
import Template from './template';
import '../Assets/css/actionplan.css';
import Modal from 'react-responsive-modal';
export default class Edituser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: this.props.location.state.User,
            redirect: false,
            open: false
        }
    }
    componentDidMount() {

    }
    firstname(e) {
        this.state.User.firstName = e.target.value;
        this.setState({
            User: this.state.User
        })
    }
    lastname(e) {
        this.state.User.lastName = e.target.value;
        this.setState({
            User: this.state.User
        })
    }
    email(e) {
        this.state.User.email = e.target.value;
        this.setState({
            User: this.state.User
        })
    }

    username(e) {
        this.state.User.username = e.target.value;
        this.setState({
            User: this.state.User
        })
    }

    department(e) {
        this.state.User.department = e.target.value;
        this.setState({
            User: this.state.User
        })
    }

    bio(e) {
        this.state.User.bio = e.target.value;
        this.setState({
            User: this.state.User
        })
    }
    submit() {
        this.setState({
            open: true
        })
        console.log(this.state)
        fetch('http://localhost:5000/api/put/user/' + this.state.User.id,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    User: this.state.User
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    User: responseJson.user,

                    message:responseJson.message
                }, () => {
                    console.log(this.state.User)
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    close() {
        this.setState({
            open: false,
            redirect: true
        })
    }
    render() {
        if(this.state.redirect == true){
            return <Redirect to ={{pathname:'/admin_dashboard', state:{
                User:this.state.User
            }}} />
        }
        return (
            <div>
                <Modal open={this.state.open} showCloseIcon={false} center>
                    <h2>{this.state.message}</h2>
                    <div className="modal-footer">
                        <button onClick={this.close.bind(this)}>ok</button>
                    </div>
                </Modal>

                <div className="container" id="admindashboard">
                    <div className="row">
                        <div className="col-lg-3 col-md-4" id="ad4">
                            <Template User={this.state.User} />

                        </div>
                        <div className="col-lg-8 col-md-8" id="ad3">
                            <h2 id="edituser">User Details </h2>

                            <div className="container" >
                                <div id='editcontent'>
                                    <div class="form-group">
                                        <label for="name">First Name</label>
                                        <input type="text" onChange={this.firstname.bind(this)} class="form-control" value={this.state.User.firstName} id="name" placeholder="Enter Name" />
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Last Name</label>
                                        <input type="text" class="form-control" onChange={this.lastname.bind(this)} value={this.state.User.lastName} id="name" placeholder="Enter Name" />
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" readOnly value={this.state.User.email} id="email" placeholder="Enter E-mail" />
                                    </div>
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input type="text" class="form-control" onChange={this.username.bind(this)} value={this.state.User.username} id="username" placeholder="Enter Username" />
                                    </div>
                                    <div class="form-group">
                                        <label for="id">ID</label>
                                        <input type="text" class="form-control" id="id" readOnly value={this.state.User.uniqueId} placeholder="Enter ID" />
                                    </div>
                                    <div class="form-group">
                                        <label for="dept">Department</label>
                                        <input type="text" class="form-control" id="dept" onChange={this.department.bind(this)} value={this.state.User.department} placeholder="Enter Deaprtment" />
                                    </div>
                                    <div>
                                        <label for="bio">Department</label>
                                        <input type="text" class="form-control" id="bio" onChange={this.bio.bind(this)} value={this.state.User.bio} placeholder="Enter Deaprtment" />
                                    </div>

                                    <button type="submit" onClick={this.submit.bind(this)} class="btn btn-primary">Submit</button>
                                    <Link to={{
                                        pathname: "/admin_dashboard",
                                        state: {
                                            User: this.props.location.state.User
                                        }
                                    }}><button type="submit" class="btn btn-danger" style={{ marginLeft: '1em' }}>Cancel</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}