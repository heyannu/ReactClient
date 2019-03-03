import React, { Component } from "react";
import cert from "../Assets/icons/cert.png";
import exit1 from "../Assets/icons/exit1.png";
import norm from "../Assets/icons/norm.png";
import fest1 from "../Assets/icons/fest1.png";
import fund from "../Assets/icons/fund.png";
import hub from "../Assets/icons/hub.png";
import legal from "../Assets/icons/legal.png";
import mobile1 from "../Assets/icons/mobile1.jpg";
import fund2 from "../Assets/icons/fund2.png";
import incubator from "../Assets/icons/incubator.png";
import annual from "../Assets/icons/annual.png";
import innovation from "../Assets/icons/innovation.png";
import studentinno from "../Assets/icons/studentinno.png";
import biotech from "../Assets/icons/biotech.png";
import mission from "../Assets/icons/mission.png";
import research from "../Assets/icons/research.png";
import tax1 from "../Assets/icons/tax1.png";
import tax3 from "../Assets/icons/tax3.png";
import tax from "../Assets/icons/tax.png";
import facebook from "../Assets/footer-icons/facebook.png";
import twitter from "../Assets/footer-icons/twitter.png";
import govt from "../Assets/footer-icons/govt.png";
import "../Assets/css/actionplan.css";
import Modal from "react-responsive-modal";
import ClipLoader from "react-spinners/ClipLoader";
import Footer from "./footer";

export default class ActionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // links: [{
      links: [],
      showPlans: "block",
      NEWS: [],
      open: false,
      sanctioned: "",
      disbursed: "",
      incubator: [],
      benef: [],
      color: '',
      nottopic: 'inline',
      topic: [],
      ap: 'none',
      showtopic: 'none',
      hidebutton: 'inline',
      showbutton: 'none',
      selectedPlan: [],
      disbursed: '',
      get: false,
      targets: [],
      target: [],
      reason: "",
      duration: 0,
      stat: 0,
      createdDate: 0,
      specDate: 0,
      app: [],
      response: []
      , actionplan: [
        { id: 1, plan: "Compliance Regime based on Self-certification " },
        { id: 2, plan: "Startup India Hub" },
        { id: 3, plan: "Rolling out of Mobile App and Portal" },
        {
          id: 4,
          plan:
            "Legal Support and Fast-tracking Patent Examination at Lower Costs "
        },
        { id: 5, plan: "Relaxed Norms of Public Procurement for Startups " },
        { id: 6, plan: "Faster Exit for Startups " },
        {
          id: 7,
          plan:
            "Providing Funding Support through a Fund of Funds with a Corpus of INR 10,000 crore "
        },
        { id: 8, plan: "Credit Guarantee Fund for Startups " },
        { id: 9, plan: "Tax Exemption on Capital Gains" },
        { id: 10, plan: "Tax Exemption to Startups for 3 years " },
        {
          id: 11,
          plan: "Tax Exemption on Investments above Fair Market Value"
        },
        {
          id: 12,
          plan:
            "Organizing Startup Fests for Showcasing Innovation and Providing a Collaboration Platform "
        },
        {
          id: 13,
          plan:
            "Launch of Atal Innovation Mission (AIM) with Self-Employment and Talent Utilization (SETU) Program "
        },
        {
          id: 14,
          plan: "Harnessing Private Sector Expertise for Incubator Setup "
        },
        { id: 15, plan: "Building Innovation Centres at National Institutes" },
        {
          id: 16,
          plan:
            " Setting up of 7 New Research Parks Modeled on the Research Park Setup at IIT Madras "
        },
        { id: 17, plan: " Promoting Startups in the Biotechnology Sector" },
        {
          id: 18,
          plan: " Launching of Innovation Focused Programs for Students "
        },
        { id: 19, plan: " Annual Incubator Grand Challenge " }
      ]
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/iNews")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            NEWS: responseJson.news
          },
          () => {
            console.log(this.state.NEWS);
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
    // this.setState({
    //           ap: this.props.location.state.User.apAccess,
    //       }, () => {
    //           for (var i = 0; i < this.state.actionplan.length; i++) {
    //               for (var j = 0; j < this.state.ap.length; j++) {
    //                   if (this.state.actionplan[i].id == this.state.ap[j])
    //                       this.state.myplans.push(this.state.actionplan[i]);
    //                   this.setState({
    //                       myplans: this.state.myplans,
    //                       open: false
    //                   })
    //               }
    //           }
    //       })
  }

  show() {
    this.setState({
      showPlans: "block",
      ap: "none"
    });
  }
  findPlan(planNo, e) {
    this.setState({
      showPlans: "none",
      showtopic:'none',
      nottopic:'none',
      ap: "block",
      open: true
    });
    fetch("http://localhost:5000/api/ap/getApDetails/" + planNo, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            targets: responseJson,
            selectedPlan: responseJson.ap,
            get: true,
            open: false,
            incubator: responseJson.ap.incube,
            benef: responseJson.ap.benef,
            sanctioned: responseJson.ap.fund.sanctioned,
            disbursed: responseJson.ap.fund.disbursed
          },
          () => {
            console.log(this.state.selectedPlan);

          }
        );
        // for (var j = 0; j < this.state.targets.ap.target.length; j++) {
        // for (var i = 0; i < this.state.targets.ap.target.objective.length; i++) {
        var p = this.state.targets.ap.target[0].objective;
        this.state.response.push(p)
        // }
        // }
        var n = this.state.selectedPlan.apNo
        if (this.state.targets.ap.target[0].status == 2) {
          this.setState({
            showbutton: 'inline'
          })
        }
        if (this.state.targets.ap.target[0].status == 0) {
          this.setState({
            status: 'not completed',
            color: 'orange',
            hidebutton: 'inline',
            showbutton: 'none'
          })
        }
        else if (this.state.targets.ap.target[0].status == 1) {
          this.setState({
            status: 'completed',
            hidebutton: 'none',
            color: 'green',
            showbutton: 'none'

          })
        }
        else if (this.state.targets.ap.target[0].status == 2) {
          this.setState({
            status: 'delayed',
            color: 'red',
            hidebutton: 'none',
            showbutton: 'inline'
          })
        }
        var d = new Date(
          this.state.targets.ap.target[0].createdOn
        );
        var dd = new Date(this.state.targets.ap.target[0].specDate)
        this.setState({
          response: this.state.response,
          topic: this.state.targets.ap.target[0].topic,
          duration: this.state.targets.ap.target[0].duration,
          stat: this.state.targets.ap.target[0].status,
          createdDate: dd.getDate() + '-' + dd.getMonth() + '-' + dd.getFullYear(),
          specDate: d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()
        }, () => {
        })
      })
      .catch(error => {
        console.error(error);
      });
  }
  topicshow() {
    this.setState({
      showtopic: 'inline',
      nottopic: 'none'
    })
  }
  confirm() {
    for (var i = 0; i < this.state.app.length; i++) {
      var x = this.state.app[i];
      console.log(x)
      this.state.targets.ap.target[0].apStats[x] = 1;
    }
    this.setState({
      apStats: this.state.apStats
    }, () => {
      console.log
        (this.state.targets.ap.target[0].apStats)
    })
    fetch('http://localhost:5000/api/target/' + this.state.targets.ap.target[0]._id + '/confirm',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apNo: this.state.app,
          apStats: this.state.targets.ap.target[0].apStats
        }),

      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({

        })
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
    if (this.state.stat == 2) {
      this.setState({
        showbutton: 'inline'
      })
    }

  }
  submitdelay() {
    this.setState({
      hidebutton: 'none'
    })
    fetch('http://localhost:5000/api/target/' + this.state.targets.ap.target[0]._id + '/delay',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rod: this.state.reason
        }),

      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          hidebutton: 'inline',
          showbutton: 'none'
        })
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  reason(e) {
    this.setState({ reason: e.target.value })
  }

  render() {
    const newss = this.state.NEWS.map((news, i) => (
      <li key={news._id} className="list hvr-sweep-to-right">
        <span style={{ display: "inline", listStyleType: "none" }}>
          {" "}
          {i + 1}.{" "}
        </span>
        {news.news}
      </li>
    ));
    const sswen = newss.reverse();
    const sswen10 = sswen.slice(0, 10);
    const benefs = this.state.benef.map((ben, i) => (
      <li key={ben._id}>
        <span style={{ display: "inline" }}> {i + 1}. </span>NAME: {ben.nos} ,
        AMOUNT DISBURSED: {ben.ad}
      </li>
    ));
    const incubs = this.state.incubator.map((inc, i) => (
      <li key={inc._id}>
        <span style={{ display: "inline" }}> {i + 1}. </span>NAME: {inc.noi} ,
        AMOUNT DISBURSED: {inc.ad}
      </li>
    ));
    const benef = this.state.benef;
    const beneflen = benef.length;
    const incube = this.state.incubator;
    const incubelen = incube.length;
    return (
      <div>
        <Modal open={this.state.open} showCloseIcon={false} center>
          <div className="container">
            <ClipLoader />
          </div>
        </Modal>
        <div>
          <div className="row">
            <div id="links" className="col-lg-3 col-md-6">
              <center>
                <h4 style={{ color: "white" }}>Latest Updates </h4>
              </center>
              <div>
                <ul className="ulist">{sswen10}</ul>
              </div>
            </div>
            <div
              id="plans"
              className="col-lg-8 col-md-8"
              style={{ borderRadius: "1em" }}
            >
              <div style={{ display: this.state.showPlans }}>
                <center>
                  <u>
                    <h1 style={{ fontFamily: "Roboto" }}>ACTION PLANS</h1>
                  </u>
                </center>
                <div className="container">
                  <div className="row">
                    <div
                      className="col-lg-3 col-md-6"
                      onClick={this.findPlan.bind(
                        this,
                        this.state.actionplan[0].id
                      )}
                    >
                      <div className="cardimg-thumbnail card-img hvr-grow">
                        <img
                          className="card-img-top cit action"
                          src={cert}
                          alt="Card  cap"
                        />

                        <h5 align="center" className="card-title cardTitle">
                          {this.state.actionplan[0].plan}
                          <span style={{ display: "none" }}>
                            {this.state.actionplan[0].id}
                          </span>
                        </h5>
                      </div>
                    </div>

                    <div
                      className="col-lg-3 col-md-6"
                      onClick={this.findPlan.bind(
                        this,
                        this.state.actionplan[1].id
                      )}
                    >
                      <div className="cardimg-thumbnail card-img hvr-grow">
                        <img
                          className="card-img-top cit action"
                          src={hub}
                          alt="Card  cap"
                        />

                        <h5 align="center" className="card-title cardTitle">
                          {this.state.actionplan[1].plan}
                          <span style={{ display: "none" }}>
                            {this.state.actionplan[1].id}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div
                      className="col-lg-3 col-md-6"
                      onClick={this.findPlan.bind(
                        this,
                        this.state.actionplan[2].id
                      )}
                    >
                      <div className="cardimg-thumbnail card-img hvr-grow">
                        <img
                          className="card-img-top cit action"
                          src={mobile1}
                          alt="Card  cap"
                        />

                        <h5 align="center" className="card-title cardTitle">
                          {this.state.actionplan[2].plan}
                          <span style={{ display: "none" }}>
                            {this.state.actionplan[2].id}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div
                      className="col-lg-3 col-md-6"
                      onClick={this.findPlan.bind(
                        this,
                        this.state.actionplan[3].id
                      )}
                    >
                      <div className="cardimg-thumbnail card-img hvr-grow">
                        <img
                          className="card-img-top cit action"
                          src={legal}
                          alt="Card  cap"
                        />

                        <h5 align="center" className="card-title cardTitle">
                          {this.state.actionplan[3].plan}
                          <span style={{ display: "none" }}>
                            {this.state.actionplan[3].id}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[4].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={norm}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[4].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[4].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[5].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={exit1}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[5].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[5].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[6].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={fund}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[6].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[6].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[7].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={fund2}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[7].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[7].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[8].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={tax}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[8].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[8].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[9].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={tax1}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[9].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[9].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[10].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={tax3}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[10].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[10].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[11].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={fest1}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[11].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[11].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[12].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={mission}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[12].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[12].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[13].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={incubator}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[13].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[13].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[14].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={innovation}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[14].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[14].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[15].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={research}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[15].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[15].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[16].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={biotech}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[16].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[16].id}
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[17].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={studentinno}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[17].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[17].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 col-md-6"
                    onClick={this.findPlan.bind(
                      this,
                      this.state.actionplan[18].id
                    )}
                  >
                    <div className="cardimg-thumbnail card-img hvr-grow">
                      <img
                        className="card-img-top cit action"
                        src={annual}
                        alt="Card  cap"
                      />

                      <h5 align="center" className="card-title cardTitle">
                        {this.state.actionplan[18].plan}
                        <span style={{ display: "none" }}>
                          {this.state.actionplan[18].id}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: this.state.ap }}>
                <div className="container" z>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-lg-9">

                    </div>
                    <div className="col-lg-3" >
                      <button
                        className="btn btn-outline-dark"
                        onClick={this.show.bind(this)}
                      >
                        Go back
                      </button>
                    </div>
                  </div>

                  <p className="templatelabel">
                    {" "}
                    Apno:
                    <span className="templatevalue">
                      {this.state.selectedPlan.apNo}
                    </span>
                  </p>
                  <p className="templatelabel">
                    {" "}
                    Sanctioned Fund:
                    <span className="templatevalue">
                      {this.state.sanctioned}
                    </span>
                  </p>
                  <p className="templatelabel">
                    {" "}
                    Disbursed Fund:
                    <span className="templatevalue">
                      {this.state.disbursed}
                    </span>
                  </p>
                  <p className="templatelabel">
                    
                    Number Of Startups:{" "}
                    <span className="templatevalue">{beneflen}</span>
                  </p>
                  <p className="templatelabel">
                    
                    Number Of Incubators:{" "}
                    <span className="templatevalue">{incubelen}</span>
                  </p>
                  <p className="templatelabel" id="beninc">
                    
                    Beneficiaries:{" "}
                    <span className="templatevalue">{benefs}</span>
                  </p>
                  <p className="templatelabel" id="beninc">
                    {incubs}
                    Incubators: <span className="templatevalue">{incubs}</span>
                  </p>
                  {(this.state.get) ?
                    <div> {/* {this.state.response.map((i)=>( */}
                      <p onClick={this.topicshow.bind(this)} className='templatelabel' style={{display:this.state.nottopic}}id='beninc'> Topic: <span className='templatevalue'>{this.state.topic}</span></p>
                      {/* ))} */}
                      <div style={{ display: this.state.showtopic }}>
                        <div className='container'>
                          <br></br><br></br>
                    
                           {/* <h2 id='color' style={{ marginTop: '0.7em' }}>{this.state.topic}</h2> */}
                          
                          <div className="col-lg-3"><button className='btn btn-outline-dark' onClick={this.show.bind(this)}>Go back</button></div>
                          <h2 style={{ color: '#000' }}>{this.state.topic}</h2>
                          {this.state.response.map((fi, b) => (
                            <li className='templatelabel'>{b + 1}.<span className='templatevalue'>{fi}</span></li>
                          ))}
                          <p className='templatelabel' id='beninc'> Duration: <span className='templatevalue'>{this.state.duration}</span></p>
                          <p className='templatelabel' id='beninc'> Status: <span style={{ color: this.state.color }} className='templatevalue'>{this.state.status}</span></p>
                          <p className='templatelabel' id='beninc'> Start Date: <span className='templatevalue'>{this.state.specDate}</span></p>
                          <p className='templatelabel' id='beninc'> Expected End Date: <span className='templatevalue'>{this.state.createdDate}</span></p>
                        </div>
                        <div class="form-group" style={{ display: this.state.showbutton }}>
                          <label for="id">Reason for delay </label>
                          <input type="text" class="form-control"
                            onChange={this.reason.bind(this)}
                            placeholder="Enter delay reason" />
                        </div>
                        <button style={{ display: this.state.hidebutton }} onClick={this.confirm.bind(this)}>Confirm</button>
                        <button style={{ display: this.state.showbutton }} onClick={this.submitdelay.bind(this)}>Delay</button>
                      </div>
                    </div> :
                    <div></div>
                  }
                </div>
              </div>
            </div>

          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
