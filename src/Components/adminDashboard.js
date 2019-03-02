import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import SyncLoader from 'react-spinners/SyncLoader';
import Template from './template';
// import dp from '../Assets/images/user.png'
import '../Assets/css/actionplan.css';
import { BrowserRouter as Route, Link } from "react-router-dom";
export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: this.props.location.state.User,
            ap: [],
            benef: [{
                nos: '',
                ad: 0,
                apNo: 0
            }],
            incub: [{
                noi: '',
                ai: 0,
                apNo: 0
            }],
            ap: [],
            open: true,
            show: 'none',
            shown: 'block',
            myplans: [],
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
            ]
        }
    }
    componentDidMount() {
        this.setState({
            ap: this.props.location.state.User.apAccess,
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
    noi(e) {
        this.state.incub[0].noi = e.target.value;
        this.setState({
            incub: this.state.incub
        })
    }
    ai(e) {
        this.state.incub[0].ai = e.target.value;
        this.setState({
            incub: this.state.incub
        })
    }
    nos(e) {
        this.state.benef[0].nos = e.target.value;
        this.setState({
            benef: this.state.benef
        })
    }
    ad(e) {
        this.state.benef[0].ad = e.target.value;
        this.setState({
            benef: this.state.benef
        })
    }
    benefsubmit() {
        fetch('http://localhost:5000/api/beneficiary/newBenef/' + this.state.benef[0].apNo,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    benef: this.state.benef[0]
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({

                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    incubsubmit(e, event) {
        fetch('http://localhost:5000/api/incubator/newIncube/' + this.state.incub[0].apNo,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    benef: this.state.incub[0]
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({

                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    findap(e, event) {
        this.setState({
            shown: 'none',
            show: 'block',
            benef: this.state.benef,
            incub: this.state.incub
        })
        fetch('http://localhost:5000/api/ap/getApDetails/' + e.id,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.benef[0].apNo = responseJson.ap.apNo
                this.state.incub[0].apNo = responseJson.ap.apNo
                this.setState({
                    ap: responseJson.ap,
                    benef: this.state.benef
                }, () => {
                    console.log(this.state.benef)
                })
            })
            .catch((error) => {
                console.error(error);
            });
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
                            <Template User={this.props.location.state.User}></Template>
                        </div>
                        <div className="col-lg-8 col-md-8" id="ad2">
                            <div>
                                <ul>
                                    <li style={{ float: "left" }}>
                                        <Link to={{
                                            pathname: '/user_access',
                                            state: {
                                                User: this.props.location.state.User
                                            }
                                        }}>
                                            <button class="btn btn-outline-info" type="button" style={{ width: '10em', marginTop: '2.0em' }}>
                                                <span>Grant Access</span>
                                            </button></Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <div>
                                            <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" id="btn-outline-warning" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>  {this.state.User.username}</span>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link to={{ pathname: '/admin_dashboard', state: { User: this.props.location.state.User } }}><button className="btn"><i className="fa fa-user"></i><span>   Profile</span>  </button></Link>
                                                <Link to={{ pathname: '/edituser', state: { User: this.props.location.state.User } }}><button className="btn"><i className="fa fa-pen"></i><span>   Edit profile</span></button></Link>
                                                <a class="dropdown-item" href="/">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
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
                                    </li>
                                </ul>
                            </div>
                            <div style={{ display: this.state.shown, height: '15em', marginTop: '6.5em' }} className="container" >
                                <center>
                                    <div>
                                        <h3 style={{color:'black', marginTop:'5em'}}>{this.state.User.username}</h3>
                                    </div>
                                </center>
                                <h5 style={{fontFamily:'roboto'}}>ADMIN STATUS: <span style={{fontSize:'0.9em', fontWeight:'normal', fontStyle:'normal', marginLeft:'2em'}}>{this.state.User.isAdmin.toString().toUpperCase()}</span></h5>
                                <h5 style={{fontFamily:'roboto'}}>FIRST NAME: <span style={{fontSize:'0.9em', fontWeight:'normal', fontStyle:'normal', marginLeft:'3.5em'}}>{this.state.User.firstName}</span></h5>
                                <h5 style={{fontFamily:'roboto'}}>LAST NAME: <span style={{fontSize:'0.9em', fontWeight:'normal', fontStyle:'normal', marginLeft:'3.8em'}}>{this.state.User.lastName}</span></h5>
                                <h5 style={{fontFamily:'roboto'}}>EMAIL: <span style={{fontSize:'0.9em', fontWeight:'normal', fontStyle:'normal', marginLeft:'6.6em'}}>{this.state.User.email}</span></h5>
                                <h5 style={{fontFamily:'roboto'}}>GENDER: <span style={{fontSize:'0.9em', fontWeight:'normal', fontStyle:'normal', marginLeft:'5.6em'}}>{this.state.User.gender}</span></h5>
                                <h5 style={{fontFamily:'roboto'}}>DEPARTMENT: <span style={{fontSize:'0.9em', fontWeight:'normal', fontStyle:'normal', marginLeft:'2.9em'}}>{this.state.User.department}</span></h5>
                            </div>
                            <div style={{ display: this.state.show }}>
                                <div style={{ marginTop: '8em', height: '25em' }}>
                                    <div className='row' id='title'>
                                        <center><p className='templatelabel'> Ap Name:<span className='templatevalue'>{this.state.ap.apNo}</span></p></center>


                                        {/* <p className='templatelabel'> Disbursed Fund:<span className='templatevalue'>{this.state.disbursed}</span></p>

                                        <p className='templatelabel'> Beneficiaries : <span className='templatevalue'>{this.state.benefl}</span></p> */}
                                    </div>
                                    <div className='row' id='actionforms'>
                                        <div className='col-lg-6' >
                                            <div >
                                                <h2>Benefeciary</h2>
                                                <div class="form-group">
                                                    <label for="id">Name of the startup </label>
                                                    <input type="text" class="form-control"
                                                        onChange={this.nos.bind(this)}
                                                        value={this.state.benef[0].nos} placeholder="Enter Name of the Startup" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="dept">Amount Disbursed</label>
                                                    <input type="text" class="form-control" onChange={this.ad.bind(this)} value={this.state.benef[0].ad} placeholder="Enter Amount Disbursed" />
                                                </div>

                                                <button onClick={this.benefsubmit.bind(this)}>submit</button>
                                            </div>
                                        </div>
                                        <div className='col-lg-6' id='incube'>
                                            <div><h2>Incubator</h2>
                                            <div class="form-group">
                                                <label for="id">Name of the Incubator </label>
                                                <input type="text" class="form-control"
                                                    onChange={this.noi.bind(this)}
                                                    value={this.state.incub[0].noi} placeholder="Enter Name of the Startup" />
                                            </div>
                                            <div class="form-group">
                                                <label for="dept">Amount Invested</label>
                                                <input type="text" class="form-control" onChange={this.ai.bind(this)} value={this.state.incub[0].ai} placeholder="Enter Amount Disbursed" />
                                            </div>
                                            <button onClick={this.incubsubmit.bind(this)}>submit</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
