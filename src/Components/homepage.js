import React, { Component } from 'react';
// import '../Assets/css/styles.css';
import Nav from './navbar';
import Footer from './footer'
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        {/* <Nav /> */}
        <div>
        <div className="bd-example">
          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://www.chaturideas.com/admin/KnowledgeCenter/180116_1121_What-every-startup-should-know-about-the-PM.jpg" title="Startup India stand up India " className="d-block w-100 carimg" alt="Startup India" />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>StartUp Ecosystem</h5>
                  </div>
      </div>
                <div className="carousel-item">
                  <img src="https://images.yourstory.com/cs/wordpress/2015/10/yourstory-Narendra-Modi-Indian-startup-fraternity-1.jpg?fm=png&auto=format?fm=png&auto=format" className="d-block w-100 carimg"title="Startup India stand up India" alt="Startup India" />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Start-Up India</h5>
                    </div>
      </div>
                  <div className="carousel-item">   
                    <img src="http://www.globalgovernancenews.com/wp-content/uploads/2018/07/Startup-India.jpg" title="Startup India stand up India" className="d-block w-100 carimg" alt="Startup India" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>StandUp India</h5>
                      </div>
      </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
        </div>
        <div style={{marginTop:'160px'}}>
                <Footer />
                </div>
      </div>
    )
  }
}