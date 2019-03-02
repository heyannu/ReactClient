import React, { Component } from "react";
import Footer from "./footer";
import DIPPLOGO from '../Assets/images/DIPPLOGO.png';
import startup from '../Assets/images/startup.png';




export default class About extends Component {
    render(){
        return(
            <div>
                <h2>
                    <center>
                    We deliver a broad range of accounting, payroll and tax solutions, backed by technology, business analytics and consulting services that help create valuable relationships between our clients, their customers, employees and regulatory authorities
                    </center>
                </h2>
                <h2><center>We Are</center></h2>
                <h1>
                    <center>
                        DEPARTMENT OF INDUSTRIAL POLICY AND PROMOTION / STARTUP INDIA
                        <div style={{marginTop:'0.5em'}}>
                        <img style={{height:'4em', borderRadius:'0.5em'}} src={DIPPLOGO} alt='Emblem' />
                        <img style={{width:'8em', marginLeft:'1em'}} src={startup} alt='Emblem' />
                        </div>
                    </center>
                </h1>
                <div style={{marginTop:'160px'}}>
                <Footer />
                </div>
            </div>
        )
    }
}