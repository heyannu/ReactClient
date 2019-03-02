import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";

export default class VerifyUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            success: '',
            message: '',
            message: '',
            redirect: false,
            User: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt-tok');
        const decoded = jwt_decode(token);
        console.log(decoded._id);
    }

    verify(e) {
        console.log('function called')
        const token = localStorage.getItem('jwt-tok');
        const decoded = jwt_decode(token);
        console.log(decoded);
        const id = decoded._id;

        fetch('http://localhost:5000/api/put/verify/' + id,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isVerified: this.state.isVerified
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message,
                    isVerified: true,
                    redirect: true,
                    User: responseJson.user
                }, () => {
                    console.log(this.state.User)

                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/user_dashboard',
                state: {
                    User: this.state.User
                }
            }} />
        }
        return (
            <div>
                <center>
                    <button onClick={this.verify.bind(this)} className="btn btn-outline-info vbcentre">CLICK HERE TO VERIFY</button>
                </center>
            </div >
        )
    }
}