import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Template from './template';
// import dp from '../Assets/images/user.png'
import '../Assets/css/actionplan.css';
import { BrowserRouter as Route, Link,Redirect } from "react-router-dom";

export default class Target extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: [],
            ap: [],
            showtarget: 'inline',
            showduration: 'none',
            targets: [],
            target: '',
            duration: 0,
            showtarget: 'inline',
            showduration: 'none',
            ap: [],
            pap: [],
            app: [],
            myplans: [],
            logged:false,
            actionplan: [
                { id: 1, plan: 'Compliance Regime based on Self-certification ' },
                { id: 2, plan: 'Startup India Hub' },
                { id: 3, plan: 'Rolling out of Mobile App and Portal' },
                { id: 4, plan: 'Legal Support and Fast-tracking Patent Examination at Lower Costs ' },
                { id: 5, plan: 'Relaxed Norms of Public Procurement for Startups ' },
                { id: 6, plan: 'Faster Exit for Startups ' },
                { id: 7, plan: 'Providing Funding Support through a Fund of Funds with a Corpus of INR 10,000 crore ' },
                { id: 8, plan: 'Credit Guarantee Fund for Startups ' },
                { id: 9, plan: "Tax Exemption on Capital Gains" },
                { id: 10, plan: 'Tax Exemption to Startups for 3 years ' },
                { id: 11, plan: 'Tax Exemption on Investments above Fair Market Value' },
                { id: 12, plan: 'Organizing Startup Fests for Showcasing Innovation and Providing a Collaboration Platform ' },
                { id: 13, plan: 'Launch of Atal Innovation Mission (AIM) with Self-Employment and Talent Utilization (SETU) Program ' },
                { id: 14, plan: 'Harnessing Private Sector Expertise for Incubator Setup ' },
                { id: 15, plan: 'Building Innovation Centres at National Institutes' },
                { id: 16, plan: ' Setting up of 7 New Research Parks Modeled on the Research Park Setup at IIT Madras ' },
                { id: 17, plan: ' Promoting Startups in the Biotechnology Sector' },
                { id: 18, plan: ' Launching of Innovation Focused Programs for Students ' },
                { id: 19, plan: ' Annual Incubator Grand Challenge ' }
            ],
            topics: ['discussion', 'meeting','funding', 'investing'],
            topic:'',
            redirect:false
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt-tok');
        if (token != null) {
            const decoded = jwt_decode(token);
            console.log(decoded)
            this.setState({
                User: decoded,
                logged: true,
            })
        }
        this.setState({
            ap: this.state.User.apAccess,
        }, () => {
            for (var i = 0; i < this.state.actionplan.length; i++) {
                for (var j = 0; j < this.state.ap.length; j++) {
                    if (this.state.actionplan[i].id == this.state.ap[j])
                        this.state.myplans.push(this.state.actionplan[i]);
                    this.setState({
                        myplans: this.state.myplans,

                    })
                }
            }
        })
    }
    target(e) {
        this.setState({
            target: e.target.value
        })
    }
    duration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    addtarget(e) {

        this.state.targets.push(this.state.target);
        this.setState({
            targets: this.state.targets
        })
    }
    showduration() {
        this.setState({
            showduration: 'inline',
            showtarget: 'none'
        })
    }
    submit() {
        console.log(this.state.app)
        for (var i = 0; i < this.state.app.length; i++) {
            fetch('http://localhost:5000/api/target/newTarget/' + this.state.app[i],
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        objective: this.state.targets,
                        duration: this.state.duration,
                        apNo: this.state.app,
                        topic: this.state.topic,
                        redirect:true
                    }),
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    findap(e) {
        this.state.pap.push(e.plan);
        this.state.app.push(e.id);
        this.setState({
            pap: this.state.pap,
            app: this.state.app
        })
    }
    topic(p,e) {
        this.setState({
            topic: p
        })
    }
    goback() {
        this.setState({ showtarget: 'inline', showduration: 'none', targets: [] })
    }
    render() {
        if(this.state.redirect==true)
        return<Redirect to ={{pathname:'/actionplan'}}/>
        return (
            <div>
                <div className="container" id="admindashboard">
                    <div className="row">
                        <div className="col-lg-3 col-md-4" id="ad">
                            <Template></Template>
                        </div>
                        <div className="col-lg-8 col-md-8" id="ad2" style={{ marginTop: '' }}>
                            <div>
                                <ul>
                                    <li style={{ float: "left" }}>
                                        
                                    </li>
                                </ul>

                                <ul>
                                    <li>
                                        <div class="dropdown">
                                            <div class="dropdown">
                                                <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" id="btn-outline-warning" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span>Action Plans</span>
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {this.state.myplans.map((single) => (
                                                        <a class="dropdown-item" onClick={this.findap.bind(this, single)}><span>{single.plan}</span></a>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <div class="dropdown">
                                            <div class="dropdown">
                                                <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" id="btn-outline-warning" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span>Topics</span>
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {this.state.topics.map((single) => (
                                                        <a class="dropdown-item" onClick={this.topic.bind(this, single)}><span>{single}</span></a>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                
                                <div className='col-lg-6' id='target'>

                                    <div className="container">

                                        <h3 style={{ opacity: 0 }}>hello</h3>
                                        {this.state.pap.map((i) => (
                                            <li style={{ listStyle: "square" }}>{i}</li>
                                        ))}
                                    
                                        <div class="form-group" style={{ display: this.state.showtarget }}>
                                            <label for="id">Topic</label>
                                            <input type="text" class="form-control"
                                                value={this.state.topic}
                                                placeholder="select topic" />
                                        </div>
                                        <div class="form-group" style={{ display: this.state.showtarget }}>
                                            <label for="id">Target</label>
                                            <input type="text" class="form-control"
                                                onChange={this.target.bind(this)}
                                                placeholder="Enter Targets" />
                                        </div>
                                        <div class="form-group" style={{ display: this.state.showduration }}>
                                            <label for="dept">Duration</label>
                                            <input type="text" class="form-control" onChange={this.duration.bind(this)} placeholder="Enter Duration" />
                                        </div>
                                        <div className='col-lg-6' id='display'>
                                            {this.state.targets.map((single) => (
                                                <li style={{marginTop:'2em'}} className='form-group'>{single}</li>
                                            ))}
                                        </div>

                                        <button className='btn btn-outline-danger' style={{ display: this.state.showtarget }} onClick={this.addtarget.bind(this)}>Add new target</button>
                                        <button className='btn btn-outline-danger' style={{ display: this.state.showtarget }} onClick={this.showduration.bind(this)}>Add</button>
                                        <button className='btn btn-outline-danger' style={{ display: this.state.showduration }} onClick={this.submit.bind(this)}>Submit</button>
                                        <button className='btn btn-outline-danger' style={{ display: this.state.showduration }} onClick={this.goback.bind(this)}>Go Back</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
