import React, { Component } from 'react';
import '../Assets/css/actionplan.css';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
export default class Reroute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        console.log("hi")

    }
    change() {
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect == true) {
            window.location.reload();

            return <Redirect to={{ pathname: '/' }} />
        }
        return (
            <div className="exit">
                <div className='container' onClick={this.change.bind(this)} style={{ backgroundColor: 'rgba(255,218,185,0.5)', width: '90em', height: "90em" }}>
                    <center><h2 id="logout">CLICK ANYWHERE TO CONTINUE...</h2></center>
                </div>

            </div>
        )
    }
}