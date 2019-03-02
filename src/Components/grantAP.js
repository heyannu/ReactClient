import React, { Component } from 'react';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import Template from './template';
import Modal from 'react-responsive-modal';
import '../Assets/css/actionplan.css';
export default class GrantAp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thissuser: this.props.location.state.selectedUser,
            User: this.props.location.state.User,
            Users: [],
            ap: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            selectedap: [],
            redirect: false,
            message: '',
            open: false
        }
    }
    componentDidMount() {
        console.log(this.props.location.state.selectedUser)

    }
    close() {
        this.setState({
            open: false,
            redirect: true
        })
    }
    check(e, value) {
        if (value.target.checked == true) {
            if ((this.state.selectedap.indexOf(e)) == -1)
                this.state.selectedap.push(e);
            this.setState({
                selectedap: this.state.selectedap
            })
        } else {
            if ((this.state.selectedap.indexOf(e)) != -1) {
                this.state.selectedap.splice(this.state.selectedap.indexOf(e), 1)
            }
            this.setState({
                selectedap: this.state.selectedap
            })
        }
        console.log(this.state.selectedap)
    }
    submit() {
        console.log()
        fetch('http://localhost:5000/api/put/userdata/' + this.props.location.state.selectedUser._id,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selectedap: this.state.selectedap
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message,
                    open: true
                }, () => {
                    console.log(this.state.success, this.state.message)

                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: "/admin_dashboard",
                state: {
                    User: this.props.location.state.User,
                    selectedap: this.state.selectedap
                }
            }} />
        }
        return (
            <div>
                <div className="container" id="admindashboard">
                    <div className="row">
                        <div className="col-lg-3 col-md-4" id="ad">
                            <Template User={this.props.location.state.User} />
                        </div>
                        <div className="col-lg-8 col-md-8" id="ad2">
                            <div className="row">
                                <div className='col-lg-4'><h2 style={{ marginTop: '1.4em' }}><span>{this.state.thissuser.username}</span></h2></div>
                                <Link to={{
                                    pathname: "/admin_dashboard",
                                    state: {
                                        User: this.props.location.state.User
                                    }
                                }}><div className="col-lg-8">
                                        <button className="btn btn-dark" style={{ width: '8em', marginTop: '2.5em', float: 'right' }}>Go Back</button>
                                    </div>
                                </Link>
                            </div>
                            <Modal open={this.state.open} showCloseIcon={false} center>
                                <h2>{this.state.message}</h2>
                                <div className="modal-footer">
                                    <button onClick={this.close.bind(this)}>ok</button>
                                </div>
                            </Modal>
                            <div className="container" id="access">
                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="1" onClick={this.check.bind(this, this.state.ap[0])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}> Compliance Regime based on Self-certification</span> </div>
                                </div>


                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="2" onClick={this.check.bind(this, this.state.ap[1])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}> Startup India Hub</span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="3" onClick={this.check.bind(this, this.state.ap[2])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Rolling out of Mobile App and Portal</span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="4" onClick={this.check.bind(this, this.state.ap[3])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Legal Support and Fast-tracking Patent Examination at Lower Costs </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="5" onClick={this.check.bind(this, this.state.ap[4])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Relaxed Norms of Public Procurement for Startups</span> </div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="6" onClick={this.check.bind(this, this.state.ap[5])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Faster Exit for Startups  </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="7" onClick={this.check.bind(this, this.state.ap[6])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Providing Funding Support through a Fund of Funds with a Corpus of INR 10,000 crore</span> </div>
                                </div>


                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="8" onClick={this.check.bind(this, this.state.ap[7])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Credit Guarantee Fund for Startups</span> </div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="9" onClick={this.check.bind(this, this.state.ap[8])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Tax Exemption on Capital Gains </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="10" onClick={this.check.bind(this, this.state.ap[9])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Tax Exemption to Startups for 3 years </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="11" onClick={this.check.bind(this, this.state.ap[10])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Tax Exemption on Investments above Fair Market Value</span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="12" onClick={this.check.bind(this, this.state.ap[11])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Organizing Startup Fests for Showcasing Innovation and Providing a Collaboration Platform </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="13" onClick={this.check.bind(this, this.state.ap[12])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Launch of Atal Innovation Mission (AIM) with Self-Employment and Talent Utilization (SETU) Program </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="14" onClick={this.check.bind(this, this.state.ap[13])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Harnessing Private Sector Expertise for Incubator Setup </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="15" onClick={this.check.bind(this, this.state.ap[14])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Building Innovation Centres at National Institutes
                                </span></div>
                                </div>

                                <div className="row row-col">
                                    <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="16" onClick={this.check.bind(this, this.state.ap[15])} /></div>
                                    <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Setting up of 7 New Research Parks Modeled on the Research Park Setup at IIT Madras 
                                            </span></div>
                                    </div>
                                    <div className="row row-col">
                                        <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="17" onClick={this.check.bind(this, this.state.ap[16])} /></div>
                                        <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Promoting Startups in the Biotechnology Sector </span></div>
                                        </div>


                                        <div className="row row-col">
                                            <div className='col-lg-2' style={{border:'1px solid black'}} > <input type="checkbox" style={{ marginTop: '2em' }} value="18" onClick={this.check.bind(this, this.state.ap[17])} /></div>
                                            <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}> Launching of Innovation Focused Programs for Students </span> </div>
                                            </div>
                                            <div className="row row-col">
                                                <div className='col-lg-2' style={{border:'1px solid black'}} ><input type="checkbox" style={{ marginTop: '2em' }} value="19" onClick={this.check.bind(this, this.state.ap[18])} /></div>
                                                <div className='col-lg-10' style={{border:'1px solid black'}}><span style={{marginTop:'1em'}}>Annual Incubator Grand Challenge </span></div>
                                                </div>

                                                <div class="col-8 col-sm-6">
                                                    <div className="row ">

                                                    </div>
                                                </div>
                                                <button onClick={this.submit.bind(this)}>submit</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            )
                        }
}