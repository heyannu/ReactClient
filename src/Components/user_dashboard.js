import React, { Component } from 'react';
import Template from './template';
import '../Assets/css/actionplan.css';
import Modal from 'react-responsive-modal';
import SyncLoader from 'react-spinners/SyncLoader';
import { BrowserRouter as Route, Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
export default class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: this.props.location.state.User,
            email: '',
            status: false,
            success: false,
            open: false,
            loading: false,
            edit: false,
            myplans: [],
            actionplan: [
                { id: 2, plan: 'Startup India Hub' },
                { id: 3, plan: 'Rolling out of Mobile App and Portal' },
                { id: 1, plan: 'Compliance Regime based on Self-certification ' },
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
            ]
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt-tok');
        const decoded = jwt_decode(token);
        console.log(decoded._id);
        this.setState({
            ap:this.state.User.apAccess,
        }, () => {
            for (var i = 0; i < this.state.actionplan.length; i++) {
                for (var j = 0; j < this.state.ap.length; j++) {
                    if (this.state.actionplan[i].id == this.state.ap[j])
                        this.state.myplans.push(this.state.actionplan[i]);
                    this.setState({
                        myplans: this.state.myplans,
                        open: false
                    })
                }
            }
        })

    }

    onChange(e) {
        this.state.email = e.target.value;
        this.setState({
            email: this.state.email
        })
    }

    goVerify(e) {
        e.preventDefault()
        this.setState({
            open: true,
            loading: true
        }, () => {

            fetch('http://localhost:5000/api/auth/verify',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        id: this.state.User.id

                    }),
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        success: responseJson.success,
                        message: responseJson.message,
                        email: responseJson,
                        open: false,
                        loading: false
                    }, () => {
                        if (this.state.success == true) {
                            this.setState({
                                edit: true
                            })
                        }
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

        })

    }


    render() {
        return (
            <div>
                <div className="container" id="admindashboard">
                    <Modal open={this.state.open} showCloseIcon={false} center>
                        <div className='container'>
                            <div className="row">
                                <div className='col-lg-5'><h2>Loading</h2></div>

                                <div className='col-lg-5' style={{ marginTop: '0.4em', marginLeft: '1em' }}> <SyncLoader
                                    color="#00BFFF"
                                    size="10"
                                    marginTop='5em'
                                    loading={this.state.loading}
                                    style={{ marginTop: '5.1em', marginLeft: '1em' }}>
                                </SyncLoader> </div> </div>
                        </div>

                    </Modal>
                    <div className="row">
                        <div className="col-lg-3 col-md-4" id="ad">
                            <Template User={this.state.User}></Template>
                        </div>

                        {
                            this.props.location.state.User.isVerified ?

                                (
                                    <div className="col-lg-8 col-md-8" id="ad2">
                                        <div className="nav">
                                            <ul>
                                                <li>
                                                    <div class="dropdown">
                                                        <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" id="btn-outline-warning" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span>Action Plans</span>
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            {this.state.myplans.map((single) => (
                                                                <a class="dropdown-item" href="/"><span>{single.plan}</span></a>
                                                            ))}

                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <div class="dropdown">
                                                        <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" id="btn-outline-warning" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span>  {this.state.User.username}</span>
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <Link  to ={{pathname:'/user_dashboard', state:{
                                                               User:this.props.location.state.User
                                                           }}} class="dropdown-item" /><i className="fa fa-user" style={{marginLeft:'1.5em'}}></i><span style={{cursor:"pointer"}}>   Profile</span> 
                                                            <a class="dropdown-item" href="/"><i className="fa fa-pen"></i><span>   Edit profile</span></a>
                                                            <a class="dropdown-item" href="/">Something else here</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )

                                :
                                (

                                    <div>
                                        <h2 className='VerifyMessage'>Verify Your Email</h2>
                                        <input type='text' className='form-control verifyfrom' onChange={this.onChange.bind(this)} readOnly={this.state.edit} placeholder='Enter Your Email To Verify'></input>
                                        <button type="submit" onClick={this.goVerify.bind(this)} class="btn btn-outline-info verifyBtn">Verify</button>
                                    </div>
                                )

                        }

                    </div>
                </div>
            </div>
        )
    }
}