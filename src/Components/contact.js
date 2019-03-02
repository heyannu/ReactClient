import React, { Component } from "react";
import facebook from "../Assets/footer-icons/facebook.png";
import twitter from "../Assets/footer-icons/twitter.png";
import govt from "../Assets/footer-icons/govt.png";
import "../Assets/css/actionplan.css";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="contacts">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <div className="address">
                <h2>Contact Us</h2>

                <p>
                  Address:
                  <br /> Udyog Bhawan, New Delhi 110011
                  <br /> EPABX : 011-23061222
                  <br /> Fax : 011-23062626
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-5" id="form">
              <div id="contact">
                <div class="form-group" />
                <div className="App">
                  <div>
                    <form action="/">
                      <label>First Name</label>
                      <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                      />
                      <label>Last Name</label>
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        placeholder="Your last name.."
                      />

                      <label>Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email"
                      />

                      <label>Subject</label>
                      <textarea
                        id="subject"
                        name="subject"
                        placeholder="Write something.."
                      />
                      <input type="submit" value="Submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}
