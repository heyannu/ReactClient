import React, { Component } from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ],
            apNo: null,
            response: {},
            nos: [],
            noi: [],
            fs: [],
            fd: [],
            choice: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/ap/newTarget/all',
                {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        success: responseJson.success,
                        message: responseJson.message,
                        response: responseJson
                    }, ()=> {
                        console.log(this.state.response)
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

    }
    findap(event, e) {
        this.setState({
            apNo:event.id
        }, ()=>{console.log(this.state.apNo)})
    }
    startup(e) {
    //  const benef = this.state.response.ap[10].benef.length;
    //  console.log(benef)
    const s =[];
     for(let i =0 ; i < 19 ; i++){
         s[i] = this.state.response.ap[i].benef.length
     }
    //  console.log(s)
     for(let i =0 ; i < 19 ; i++){
        this.state.nos.push(s[i])
    }

     this.setState({
         nos: s,
         choice: 'startup'
     })
     console.log(this.state.nos)
    }

    incube(e) {
        const inc =[];
        for(let i =0 ; i < 19 ; i++){
            inc[i] = this.state.response.ap[i].incube.length
        }
        // console.log(inc)
        for(let i =0 ; i < 19 ; i++){
           this.state.noi.push(inc[i])
       }
   
        this.setState({
            noi: inc,
            choice: 'incube'
        })
        console.log(this.state.noi)
    }
    fund(e) {
        const funS = [];
        const funDs = []

        for(let i =0 ; i < 19 ; i++){
            funS[i] = this.state.response.ap[i].fund.sanctioned
            funDs[i] = this.state.response.ap[i].fund.disbursed
        }
        for(let i =0 ; i < 19 ; i++){
            this.state.fs.push(funS[i])
            this.state.fd.push(funDs[i])
        }
        this.setState({
            fs: funS,
            fd: funDs,
            choice: 'fund'
        })
        console.log(this.state.fs,this.state.fd)
    }
    report(e) {
        if(this.state.choice == 'fund') {
            let i = 0;
            let s = [];
            for( i = 0;i < 19 ; i++){
             s[i] = this.state.response.ap[i].fund.sanctioned;
            }
            var data = [];
            for(  i = 0 ;i < 19 ; i++ )
            {
              data.push(s[i])
            }
  
  
               
      var width = 700  ;
      var height = 600 ;
      var margin = {
        top : 45,
        left: 80,
        right: 45,
        bottom: 45
      };
      
      var svg = d3.select("#SVG")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);
      
  
      
      var xScale = d3.scaleBand()
      .domain(['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'])
      .rangeRound([margin.left, width - margin.right])
      .padding(.4);
      
      var yScale = d3.scaleLinear()
      .domain([0,12000])
      .range([height - margin.bottom, margin.top]);
      
      var xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height-margin.top})`)
      .call(d3.axisBottom().scale(xScale));
      
      var yAxis = svg.append("g")
                     .attr("transform",`translate(${margin.left},0)`)
                     .call(d3.axisLeft().scale(yScale));
      var bar = svg.selectAll("rect")
                   .data(data)
                   .enter()
                   .append("rect")
                      .attr("x", function(d, i){
                         return xScale(i) ;
                      })
                      .attr("y", function(d){return yScale(d);})
                      .attr("width", xScale.bandwidth())
                      .attr("height", function(d){
                        return height - margin.bottom - yScale(d);})
                      .attr("fill", "black")
                      .on("mouseover", function(){
                        d3.select(this)
                          .transition()
                          .duration(500)
                          .attr("fill", "blue")
                      })
                      .on("mouseout", function(){
                        d3.select(this)
                          .transition()
                          .duration(500)
                          .attr("fill", "black")
                      })
                    //   .on("mousemove" , function(d){
                    //     tooltip
                    //     .style("opacity",1)
                    //     .style("left",d3.event.x + "px")
                    //     .style("left",d3.event.y + "px")
                    //     .text(d);
                    //   }) 
                    //   .on("mouseout" , function(){
                    //     tooltip
                    //       .style("opacity",0);
                    //   });
        svg.append('text')
      .attr('x', -(height / 2) - margin.left)
      .attr('y', margin.right / 3)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Sanctioned')
  
        svg.append('text')
      .attr('x', width / 2 + margin.bottom)
      .attr('y', 590)
      .attr('text-anchor', 'middle')
      .text('Action Points')
  
        svg.selectAll("text")
                 .data(data)
                 .enter()
                 .append("text")
                 .text(function(d) {
                      for(var i = 0; i < data.length; i++){
                          return data[i];
                      }
                    })
        }
    }

    render() {
        return (
            <div>
                <center>
                    {/* <div class="dropdown" style={{ marginTop: '1em', display: 'inline-block' }}>
                        <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Action Plans</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.state.actionplan.map((single) => (
                                <a class="dropdown-item" onClick={this.findap.bind(this, single)}><span>{single.plan}</span></a>
                            ))}
                        </div>
                    </div> */}
                    <div style={{ marginTop: '2em', display: 'inline-block', marginLeft: '2em' }}>
                        <div class="form-check form-check-inline">
                            <input onClick={this.startup.bind(this)} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="No Of Startup" />
                            <label class="form-check-label" for="inlineRadio1">No Of Startups</label></div>
                        <div class="form-check form-check-inline">
                            <input onClick={this.incube.bind(this)} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="No Of Incub" />
                            <label class="form-check-label" for="inlineRadio2">No Of Incubes</label></div>
                        <div class="form-check form-check-inline">
                            <input onClick={this.fund.bind(this)} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="To Fund" />
                            <label class="form-check-label" for="inlineRadio3">To Fund</label></div>
                    </div>
                    <div style={{ marginTop: '2em', display: 'block', marginLeft: '1em'}}>
                    <button onClick={this.report.bind(this)} style={{width:'7em'}} class="btn btn-outline-success " type="button">View Status</button>    
                    </div>
                </center>
                
                <div id='SVG' style={{marginLeft:'6em'}}>

                </div>
            </div>
        )
    }
}

export default withFauxDOM(Status);