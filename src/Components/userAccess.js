import React, { Component } from 'react';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import Template from './template';
import '../Assets/css/actionplan.css';
import jwt_decode from 'jwt-decode';
import Modal from 'react-responsive-modal';
import SyncLoader from 'react-spinners/SyncLoader';

export default class UserAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: [],
            allusers: [],
            Users: [],
            sendUser: [],
            redirect: false,
            open: true,
            loading:true,
            logged: false
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt-tok');
        if (token != null) {
            const decoded = jwt_decode(token);
            console.log(decoded)
            this.setState({
                User: decoded,
                logged: true
            })
        }
        fetch('http://localhost:5000/api/userData',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    allusers: responseJson,
                    open:false,
                    loading:false
                }, () => {
                    for (var i = 0; i < this.state.allusers.length; i++) {
                        if (this.state.allusers[i].isAdmin === false) {
                            this.state.Users.push(this.state.allusers[i])
                            this.setState({
                                Users: this.state.Users
                            })
                        }
                    }
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    send(event, u) {
        this.setState({
            sendUser: event,
            redirect: true
        }, () => {
            console.log(this.state.sendUser)
        })

    }
    render() {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/grant_ap',
                state: {
                    selectedUser: this.state.sendUser
                }
            }} />
        }
        else if (this.state.logged == false) {
            return (
                <div>
                <center><h1>You need to login to continue!</h1></center>
            </div>
            )
        }
        else 
        return (
            <div>
                <div className="container" id="admindashboard">
                    <Modal open={this.state.open} showCloseIcon={false} center>
                      <div className='container'>
                      <div className="row">
                        <div className='col-lg-5'><h2>Loading</h2></div>
                        
                       <div className='col-lg-5' style={{marginTop:'0.4em', marginLeft:'1em'}}> <SyncLoader
                        color="#00BFFF"
                        size="10"
                       marginTop='5em'
                       loading={this.state.loading}
                        style={{marginTop:'5.1em', marginLeft:'1em'}}>
                        </SyncLoader> </div> </div>    
                      </div>                

                    </Modal>
                    <div className="row">
                        <div className="col-lg-3 col-md-4" id="ad">
                            <Template />
                        </div>
                        <div className="col-lg-8 col-md-8" id="ad2">
                            <div className="container">
                                <div className="row">
                                    <div className='col-lg-4' style={{ marginTop: '1.5em' }}><h2>Users</h2></div>
                                    <Link to={{
                                        pathname: "/admin_dashboard"
                                    }}><div className="col-lg-8"><button className="btn btn-outline-dark" style={{ marginTop: '1.5em', width: '8em', float: 'right' }}>Go Back</button></div></Link>
                                </div>
                                <hr />
                                {this.state.Users.map((single) => (

                                    <div className="element">
                                        <li onClick={this.send.bind(this, single)}>
                                            <div className="row">
                                                <div className='col-lg-3'>
                                                    {single.uniqueId}
                                                </div>
                                                <div className="col-lg-6" style={{ marginLeft: '3.70em', fontSize: '20px' }}>
                                                    {single.firstName} {single.lastName}
                                                </div>
                                            </div>
                                        </li>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}