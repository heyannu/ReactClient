import React, { Component } from 'react';
import '../Assets/css/actionplan.css';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Footer from './footer';


class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MOMS: [],
            MOMs: {
                ap: '',
                duration: '',
                pAttend: '',
                agenda: '',
                fileUpload: null,
                parkingLot: '',
                objective: '',
                nextDate: ''
            },
            fileUpload: null,
            com1: {},
            com2: {},
            iscom1: 'none',
            iscom2: 'none',
            mt: '2em',
            fileUpload: null,
            index: 0,
            display: [],
            isForm: false,
            isCompare: false,
            isDisplay: false,
            isDisplay1: false,
            postCreated: false
        };
    }
    ap(e) {
        this.state.MOMs.ap = e.target.value;
        this.setState({
            ap: this.state.MOMs.ap
        })
    }
    objective(e) {
        this.state.MOMs.objective = e.target.value;
        this.setState({
            objective: this.state.MOMs.objective
        })
    }
    duration(e) {
        this.state.MOMs.duration = e.target.value;
        this.setState({
            duration: this.state.MOMs.duration
        })
    }
    pAttend(e) {
        this.state.MOMs.pAttend = e.target.value;
        this.setState({
            pAttend: this.state.MOMs.pAttend
        })
    }
    agenda(e) {
        this.state.MOMs.agenda = e.target.value;
        this.setState({
            agenda: this.state.MOMs.agenda
        })
    }
    parkingLot(e) {
        this.state.MOMs.parkingLot = e.target.value;
        this.setState({
            parkingLot: this.state.MOMs.parkingLot
        })
    }
    nextDate(e) {
        this.state.MOMs.nextDate = e.target.value;
        this.setState({
            nextDate: this.state.MOMs.nextDate
        })
    }
    fileUpload(e) {
        this.state.fileUpload = e.target.files[0];
        this.setState({
            fileUpload: this.state.fileUpload
        })
    }
    submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('docFile', this.state.fileUpload);
        const id = this.state.display._id;
        fetch('http://localhost:5000/api/minutes/' + id + "/upload",
            {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                },
                body: formData,
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message,
                    isDisplay1: false,
                    postCreated: true,
                    fileUpload: responseJson.fileName

                }, () => {
                    console.log(this.state.fileUpload)

                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    view(e) {
        const link = this.state.fileUpload
        if (link != null) {
            window.open(link)
        }
        else {
            alert('Link Is Null. Upload File First')
        }
    }
    click(e) {
        const val = e.currentTarget.innerHTML;
        var r = val.split(" ")[3];
        console.log(r);
        this.state.display = this.state.MOMS[r - 1];
        console.log('here', this.state.display)
        this.setState({
            index: r,
            display: this.state.display,
            isDisplay: true,
            isDisplay1: true,
            fileUpload: this.state.display.fileUpload
        }, () => { console.log(this.state.display) })
    }
    delete(e) {
        const id = this.state.display._id;
        fetch('http://localhost:5000/api/minutes/remove/' + id,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message
                }, () => {
                    if (this.state.success) {
                        alert('MOM DELETED');
                        return window.location.reload();
                    }

                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    create(e) {
        this.setState({
            isForm: !this.state.isForm
        })
    }
    compare(e) {
        this.setState({
            isCompare: !this.state.isCompare
        })
    }
    createMOM(e) {

        fetch('http://localhost:5000/api/minutes/newMinute',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MoM: this.state.MOMs
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    success: responseJson.success,
                    message: responseJson.message,

                }, () => {
                    console.log(this.state.MOMs);
                    alert(this.state.message);
                    this.setState({
                        isForm: false
                    })
                    window.location.reload();
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // componentDidMount() {
    //     fetch('http://localhost:5000/api/minutes/minutesData')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 MOMS: responseJson.amom
    //             }, () => {
    //                 console.log(this.state.MOMS)

    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //         window.location.reload();
    //       }

    componentDidMount() {
        fetch("http://localhost:5000/api/minutes/minutesData")
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        MOMS: responseJson.amom
                    },
                    () => {
                        console.log(this.state.MOMS);
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }
    findap1(e) {
        console.log(e);
        this.setState({
            com1: e,
            iscom1: 'inline'
        })
    }
    findap2(e) {
        console.log(e);
        this.setState({
            com2: e,
            iscom2: 'inline'
        })
    }

    render() {
        const moms = this.state.MOMS.map((mom, i) =>
            <li className='MOMLi hvr-sweep-to-right' onClick={this.click.bind(this)} key={mom._id}><span style={{ display: 'inline' }}> {i + 1}. </span>{mom.objective}</li>
        );
        // const agendas =String( this.state.display.agenda);
        // const agenda = agendas.split(',');

        // const pLots = String(this.state.display.parkingLot);
        // const pLot = pLots.split(',')

        return (
            <div>
                <div style={{ height: '45em' }}>
                    <div className="row" style={{ height: '45em' }}>
                        <div id="links" className="col-lg-3 col-md-6">
                            <center><h4 style={{ fontFamily: 'Roboto', color: 'white', textDecoration: 'underline', fontSize: '35px' }}>Archive</h4></center>
                            <div>
                                <ul className='momul' style={{ height: '35em' }}><br></br>
                                    {moms}
                                </ul>
                                <button onClick={this.create.bind(this)} type="button" class="btn btn-outline-success momtbtn3" style={{ display: !this.state.isForm ? 'inline' : 'none' }}>Create MOM</button>
                                <button onClick={this.create.bind(this)} type="button" class="btn btn-outline-success momtbtn3" style={{ display: this.state.isForm ? 'inline' : 'none', width: '6em' }}>Back</button>
                                <button onClick={this.compare.bind(this)} type="button" class="btn btn-outline-success momtbtn9" style={{ width: '6em' }}>Compare</button>
                            </div>
                        </div>
                        {
                            this.state.isForm ?
                                (
                                    <div id="plans" className="col-lg-8 col-md-8" style={{ height: '42em' }}>
                                        <center><u><h1 style={{ fontFamily: 'Roboto', fontSize: '50px' }}> Create Minutes Of Meeting</h1></u></center>
                                        <div className="container">
                                            <br></br><br></br>
                                            <p style={{ display: 'inline-block', width: '25em' }} className='templatelabel'>Action Point Reference:<input type='text' className='form-control tempinp' value={this.state.MOMs.ap} onChange={this.ap.bind(this)}></input></p>
                                            <p style={{ display: 'inline-block', width: '25em', marginLeft: '2em' }} className='templatelabel'>Duration(Minutes):<input type='text' className='form-control tempinp' value={this.state.MOMs.duration} onChange={this.duration.bind(this)}></input></p>
                                            <p className='templatelabel' style={{ width: '52em' }}>Objective:<input type='text' className='form-control tempinp' value={this.state.MOMs.objective} onChange={this.objective.bind(this)}></input></p>
                                            <p className='templatelabel' style={{ width: '52em' }}>Attendees:<input type='text' className='form-control tempinp' value={this.state.MOMs.pAttend} onChange={this.pAttend.bind(this)}></input></p>
                                            <p className='templatelabel' style={{ width: '52em' }}>Next Date:<input type='text' className='form-control tempinp' value={this.state.MOMs.nextDate} onChange={this.nextDate.bind(this)}></input></p>
                                            <p className='templatelabel' style={{ display: 'inline-block', width: '25em' }}>Agenda:<input type='text' className='form-control tempinp' value={this.state.MOMs.agenda} onChange={this.agenda.bind(this)}></input></p>
                                            <p className='templatelabel' style={{ display: 'inline-block', width: '25em', marginLeft: '2em' }}>ParkingLot:<input type='text' className='form-control tempinp' value={this.state.MOMs.parkingLot} onChange={this.parkingLot.bind(this)}></input></p>


                                            <button type="submit" onClick={this.createMOM.bind(this)} class="btn btn-outline-primary momtbtn8">Click To Create MOM</button>

                                        </div>
                                    </div>

                                )
                                :
                                [
                                    (!this.state.isCompare ?
                                        [
                                            <div id="plans" className="col-lg-8 col-md-8" style={{ height: '42em' }} >
                                                <center><u><h1 style={{ fontFamily: 'Roboto', fontSize: '50px' }}>Minutes Of Meeting</h1></u></center>
                                                <div className="container" style={{ display: this.state.isDisplay1 ? 'inline' : 'none' }}>
                                                    <br></br><br></br>
                                                    <p style={{ display: 'inline-block', width: '25em' }} className='templatelabel'>Date:<span className='templatevalue'>{this.state.display.createdOn}</span></p>
                                                    <p style={{ display: 'inline-block', width: '25em', marginLeft: '2em' }} className='templatelabel'>Next Date:<span className='templatevalue'>{this.state.display.nextDate}</span></p>
                                                    <p className='templatelabel'>AP Ref:<span className='templatevalue'>{this.state.display.ap}</span></p>
                                                    <p className='templatelabel'>Objective:<span className='templatevalue'>{this.state.display.objective}</span></p>
                                                    <p className='templatelabel'>Duration:<span className='templatevalue'>{this.state.display.duration}</span></p>
                                                    <p className='templatelabel'>Attendees:<span className='templatevalue'>{this.state.display.pAttend}</span></p>
                                                    <p className='templatelabel'>Agenda:<span className='templatevalue'>{this.state.display.agenda}</span></p>
                                                    <p className='templatelabel'>ParkingLot:<span className='templatevalue'>{this.state.display.parkingLot}</span></p>

                                                    <div>
                                                        <p className='templatelabel'>Select File:<input type='file' className='UploadImage1' name='docFile' id="docFile" onChange={this.fileUpload.bind(this)}></input><label for="docFile">Choose a file</label></p>
                                                        <button onClick={this.submit.bind(this)} type="button" class="btn btn-outline-primary momtbtn4">Upload File</button>
                                                    </div>

                                                    <button onClick={this.delete.bind(this)} type="button" class="btn btn-outline-danger momtbtn1" style={{ display: this.state.isDisplay ? 'inline' : 'none' }}>Delete MOM</button>
                                                    <button onClick={this.view.bind(this)} type="button" class="btn btn-outline-warning momtbtn2" style={{ display: this.state.isDisplay ? 'inline' : 'none' }}>View File</button>
                                                </div>
                                            </div>
                                        ]
                                        :
                                        [
                                            <div>
                                                <div class="dropdown" style={{ display: 'inline-block' }}>
                                                    <button style={{ width: '15em', marginTop: this.state.mt, marginLeft: '10em' }} class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span>Select</span>
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        {this.state.MOMS.map((single) => (
                                                            <a onClick={this.findap1.bind(this, single)} class="dropdown-item" ><span>{single.objective}</span></a>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div class="dropdown" style={{ display: 'inline-block' }}>
                                                    <button style={{ width: '15em', marginTop: this.state.mt, marginLeft: '18em' }} class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span>Select</span>
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        {this.state.MOMS.map((single) => (
                                                            <a onClick={this.findap2.bind(this, single)} class="dropdown-item" ><span>{single.objective}</span></a>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div style={{ display: this.state.iscom1, float: 'left', marginTop: '2em', marginLeft: '10em', marginRight: '6em' }}>
                                                        <p className='templatelabel'>Date:<span className='templatevalue'>{this.state.com1.createdOn}</span></p>
                                                        <p className='templatelabel'>Next Date:<span className='templatevalue'>{this.state.display.nextDate}</span></p>
                                                        <p className='templatelabel'>AP Ref:<span className='templatevalue'>{this.state.com1.ap}</span></p>
                                                        <p className='templatelabel'>Objective:<span className='templatevalue'>{this.state.com1.objective}</span></p>
                                                        <p className='templatelabel'>Duration:<span className='templatevalue'>{this.state.com1.duration}</span></p>
                                                        <p className='templatelabel'>Attendees:<span className='templatevalue'>{this.state.com1.pAttend}</span></p>
                                                        <p className='templatelabel'>Agenda:<span className='templatevalue'>{this.state.com1.agenda}</span></p>
                                                        <p className='templatelabel'>ParkingLot:<span className='templatevalue'>{this.state.com1.parkingLot}</span></p>
                                                    </div>
                                                    <div style={{ display: this.state.iscom2, float: 'right', marginTop: '2em', marginLeft: '10em' }}>
                                                        <p className='templatelabel'>Date:<span className='templatevalue'>{this.state.com2.createdOn}</span></p>
                                                        <p className='templatelabel'>Next Date:<span className='templatevalue'>{this.state.display.nextDate}</span></p>
                                                        <p className='templatelabel'>AP Ref:<span className='templatevalue'>{this.state.com2.ap}</span></p>
                                                        <p className='templatelabel'>Objective:<span className='templatevalue'>{this.state.com2.objective}</span></p>
                                                        <p className='templatelabel'>Duration:<span className='templatevalue'>{this.state.com2.duration}</span></p>
                                                        <p className='templatelabel'>Attendees:<span className='templatevalue'>{this.state.com2.pAttend}</span></p>
                                                        <p className='templatelabel'>Agenda:<span className='templatevalue'>{this.state.com2.agenda}</span></p>
                                                        <p className='templatelabel'>ParkingLot:<span className='templatevalue'>{this.state.com2.parkingLot}</span></p>
                                                    </div>
                                                </div>

                                            </div>
                                        ]
                                    )

                                ]
                        }
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Archive;
