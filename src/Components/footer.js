import React, { Component } from "react";
import Emblem from "../Assets/images/emblem.png";
import facebook from "../Assets/footer-icons/facebook.png";
import twitter from "../Assets/footer-icons/twitter.png";
import govt from "../Assets/footer-icons/govt.png";
import "../Assets/css/actionplan.css";


export default class Footer extends Component {
    render(){
        return(
            <footer className="footer-distributed">
            <div className="footer-left">
              <img className="govt" src={govt} alt="Card cap" />
              <br />
              <div className="footer-links">
                <a href="#">Home</a>·<a href="#">About</a>·<a href="#">Contact</a>
              </div>
            </div>
  
            <div className="footer-center">
              <span>Contact Us</span>
  
              <div>
                <i className="fa fa-phone" />
                <p>011-23061222</p>
              </div>
  
              <div>
                <i className="fa fa-envelope" />
                <p>
                  <a href="mailto:dipp@nic.in">dipp@nic.in</a>
                </p>
              </div>
            </div>
  
            <div className="footer-right">
              <p className="footer-about">
                <span>About Us</span>
                This website tracks the day to day activities of startup India
                Action Plan
              </p>
  
              <div className="footer-icons">
                <a href="#">
                  <img className="social" src={facebook} alt="Card cap" />
                </a>
                <a href="#">
                  <img className="social" src={twitter} alt="Card cap" />
                </a>
              </div>
            </div>
          </footer>
        )
    }
}