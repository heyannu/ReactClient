import React, { Component } from "react";
import "../Assets/css/actionplan.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Footer from "./footer";

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MOMS: [],
      MOMs: {
        ap: "",
        objective: "",
        duration: "",
        pAttend: "",
        agenda: "",
        fileUpload: null
      },
      fileUpload: null,
      index: 0,
      display: [],
      isForm: false,
      isDisplay: false,
      isDisplay1: false,
      postCreated: false
    };
  }
  ap(e) {
    this.state.MOMs.ap = e.target.value;
    this.setState({
      ap: this.state.MOMs.ap
    });
  }
  objective(e) {
    this.state.MOMs.objective = e.target.value;
    this.setState({
      objective: this.state.MOMs.objective
    });
  }
  duration(e) {
    this.state.MOMs.duration = e.target.value;
    this.setState({
      duration: this.state.MOMs.duration
    });
  }
  pAttend(e) {
    this.state.MOMs.pAttend = e.target.value;
    this.setState({
      pAttend: this.state.MOMs.pAttend
    });
  }
  agenda(e) {
    this.state.MOMs.agenda = e.target.value;
    this.setState({
      agenda: this.state.MOMs.agenda
    });
  }
  fileUpload(e) {
    this.state.fileUpload = e.target.files[0];
    this.setState({
      fileUpload: this.state.fileUpload
    });
  }
  submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("docFile", this.state.fileUpload);
    const id = this.state.display._id;
    fetch("http://localhost:5000/api/minutes/" + id + "/upload", {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            success: responseJson.success,
            message: responseJson.message,
            isDisplay1: false,
            postCreated: true
          },
          () => {
            console.log(this.state.success, this.state.message);
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  view(e) {
    const link = this.state.fileUpload;
    window.open(link);
  }
  click(e) {
    const val = e.currentTarget.innerHTML;
    var r = val.split(" ")[3];
    console.log(r);
    this.state.display = this.state.MOMS[r - 1];
    this.setState({
      index: r,
      display: this.state.display,
      isDisplay: true,
      isDisplay1: true,
      fileUpload: this.state.display.fileUpload
    });
  }
  delete(e) {
    const id = this.state.display._id;
    fetch("http://localhost:5000/api/minutes/remove/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            success: responseJson.success,
            message: responseJson.message
          },
          () => {
            if (this.state.success) {
              alert("MOM DELETED");
              return window.location.reload();
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  create(e) {
    this.setState({
      isForm: true
    });
  }
  createMOM(e) {
    fetch("http://localhost:5000/api/minutes/newMinute", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MoM: this.state.MOMs
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            success: responseJson.success,
            message: responseJson.message
          },
          () => {
            console.log(this.state.MOMs);
            alert(this.state.message);
            this.setState({
              isForm: false
            });
            window.location.reload();
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
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

  render() {
    const moms = this.state.MOMS.map((mom, i) => (
      <li className="MOMLi" onClick={this.click.bind(this)} key={mom._id}>
        <span style={{ display: "inline" }}> {i + 1}. </span>
        {mom.objective}
      </li>
    ));

    return (
      <div>
        <div>
          <div className="row" style={{ height: "550px" }}>
            <div id="links" className="col-lg-3 col-md-6">
              <center>
                <h4
                  style={{
                    fontFamily: "Roboto",
                    color: "black",
                    textDecoration: "underline",
                    fontSize: "35px"
                  }}
                >
                  Archive
                </h4>
              </center>
              <div>
                <ul className="momul">
                  <br />
                  {moms}
                </ul>
                <button
                  onClick={this.create.bind(this)}
                  type="button"
                  class="btn btn-outline-success momtbtn3"
                  style={{ display: !this.state.isForm ? "inline" : "none" }}
                >
                  Create MOM
                </button>
              </div>
            </div>
            {!this.state.isForm ? (
              <div
                id="plans"
                className="col-lg-8 col-md-8"
                style={{ borderRadius: "1em" }}
              >
                <center>
                  <u>
                    <h1 style={{ fontFamily: "Roboto", fontSize: "50px" }}>
                      Minutes Of Meeting
                    </h1>
                  </u>
                </center>
                <div
                  className="container"
                  style={{ display: this.state.isDisplay1 ? "inline" : "none" }}
                >
                  <br />
                  <br />
                  <p className="templatelabel">
                    Date:
                    <span className="templatevalue">
                      {this.state.display.createdOn}
                    </span>
                  </p>
                  <p className="templatelabel">
                    Objective:
                    <span className="templatevalue">
                      {this.state.display.objective}
                    </span>
                  </p>
                  <p className="templatelabel">
                    Duration:
                    <span className="templatevalue">
                      {this.state.display.duration}
                    </span>
                  </p>
                  <p className="templatelabel">
                    Attendees:
                    <span className="templatevalue">
                      {this.state.display.pAttend}
                    </span>
                  </p>
                  <p className="templatelabel">
                    Agenda:
                    <span className="templatevalue">
                      {this.state.display.agenda}
                    </span>
                  </p>
                  <div>
                    <p className="templatelabel">
                      Select File:
                      <input
                        type="file"
                        className="UploadImage1"
                        name="docFile"
                        id="docFile"
                        onChange={this.fileUpload.bind(this)}
                      />
                      <label for="docFile">Choose a file</label>
                    </p>
                    <button
                      onClick={this.submit.bind(this)}
                      type="button"
                      class="btn btn-outline-primary momtbtn4"
                    >
                      Upload File
                    </button>
                  </div>

                  <button
                    onClick={this.delete.bind(this)}
                    type="button"
                    class="btn btn-outline-danger momtbtn1"
                    style={{
                      display: this.state.isDisplay ? "inline" : "none"
                    }}
                  >
                    Delete MOM
                  </button>
                  <button
                    onClick={this.view.bind(this)}
                    type="button"
                    class="btn btn-outline-warning momtbtn2"
                    style={{
                      display: this.state.isDisplay ? "inline" : "none"
                    }}
                  >
                    View File
                  </button>
                </div>
              </div>
            ) : (
              <div
                id="plans"
                className="col-lg-8 col-md-8"
                style={{ border: "1px solid brown", borderRadius: "1em" }}
              >
                <center>
                  <u>
                    <h1 style={{ fontFamily: "Roboto", fontSize: "50px" }}>
                      {" "}
                      Create Minutes Of Meeting
                    </h1>
                  </u>
                </center>
                <div className="container">
                  <br />
                  <br />
                  <p className="templatelabel">
                    Action Point Reference:
                    <input
                      type="text"
                      className="form-control tempinp"
                      value={this.state.MOMs.ap}
                      onChange={this.ap.bind(this)}
                    />
                  </p>
                  <p className="templatelabel">
                    Objective:
                    <input
                      type="text"
                      className="form-control tempinp"
                      value={this.state.MOMs.objective}
                      onChange={this.objective.bind(this)}
                    />
                  </p>
                  <p className="templatelabel">
                    Duration(Minutes):
                    <input
                      type="text"
                      className="form-control tempinp"
                      value={this.state.MOMs.duration}
                      onChange={this.duration.bind(this)}
                    />
                  </p>
                  <p className="templatelabel">
                    Attendees:
                    <input
                      type="text"
                      className="form-control tempinp"
                      value={this.state.MOMs.pAttend}
                      onChange={this.pAttend.bind(this)}
                    />
                  </p>
                  <p className="templatelabel">
                    Agenda:
                    <input
                      type="text"
                      className="form-control tempinp"
                      value={this.state.MOMs.agenda}
                      onChange={this.agenda.bind(this)}
                    />
                  </p>

                  <button
                    type="submit"
                    onClick={this.createMOM.bind(this)}
                    class="btn btn-outline-primary momtbtn1"
                  >
                    Click To Create MOM
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: "160px" }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Archive;
