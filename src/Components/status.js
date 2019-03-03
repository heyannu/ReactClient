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
            no: null,
            response: {},
            benef: ''
        }
    }

    componentDidMount() {


    }
    findap(event, e) {

        this.setState({
            no: event.id
        }, () => {
            const ids = this.state.no
            console.log(ids);
            fetch('http://localhost:5000/api/ap/getApDetails/' + ids,
                {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson.message)
                    this.setState({
                        success: responseJson.success,
                        message: responseJson.message,
                        response: responseJson
                    }, function() {
                        console.log(this.state.response)
                        let x = this.state.response.ap.benef.length;
                        let d = new Date(Date.now());
                        let nw = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                        let rm = []; let a = []; let rd = []; let frr1 = 0; let frr6 = 0; let frr5 = 0; let frr4 = 0; let frr3 = 0; let frr2 = 0;
                        for (let i = 0; i < x; i++) {
                            a = this.state.response.ap.benef[i].createdOn;
                            let aa = new Date(a);
                            
                            rm[i] = nw.getMonth() - aa.getMonth();
                           
                            rd[i] = Math.abs(nw.getDay() - aa.getDay());
                            console.log('RM',rm);
                            console.log('RD',rd);
                           

                        }
                       
                        for (let i = 0; i < x; i++) {
                            if (rm[i] <= 1 && rm[i] >= 0) {
                                if (rd[i] < 5 && rd[i] >= 0) {
                                    frr1++;
                                    
                                }
                               else if (rd[i] < 10 && rd[i] >= 5) {
                                    frr2++;
                                    

                                } else if (rd[i] < 15 && rd[i] >= 10) {
                                    frr3++;
                                   

                                }else  if (rd[i] < 20 && rd[i] >= 15) {
                                    frr4++;
                                    
                                } else if (rd[i] < 25 && rd[i] >= 20) {
                                    frr5++;
                                    

                                }else  if (rd[i] <= 30 && rd[i] >= 25) {
                                    frr6++;
                                                                   
                                }
                            }
                        }

                       console.log(frr1);
                       console.log(frr2);
                       console.log(frr3);
                       console.log(frr4);
                       console.log(frr5);
                       console.log(frr6);

                        var data = [];
                        data.push(frr1);
                        data.push(frr2);
                        data.push(frr3);
                        data.push(frr4);
                        data.push(frr5);
                        data.push(frr6);
console.log('Data',data);

                        var width = 500;
                        var height = 600;
                        var margin = {
                            top: 45,
                            left: 45,
                            right: 45,
                            bottom: 45
                        };
                        var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    

    
    var xScale = d3.scaleBand()
    .domain(["5", "10", "15", "20", "25", "30"])
    .rangeRound([margin.left, width - margin.right])
    .padding(.5);
    
    var yScale = d3.scaleLinear()
    .domain([0,100])
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
                       return xScale((i + 1) * 5);
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
                    });
      svg.append('text')
    .attr('x', -(height / 2) - margin.left)
    .attr('y', margin.right / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('start-ups involved')

      svg.append('text')
    .attr('x', width / 2 + margin.bottom)
    .attr('y', 580)
    .attr('text-anchor', 'middle')
    .text('no. of days')

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
                    
                        
                    )
                })
                .catch((error) => {
                    console.error(error);
                });

        });


    }
    startup(e) {
        // this.state.benef = e.target.value;
        // this.setState({
        //     benef: this.state.benef
        // })

    }

    render() {
        return (
            <div>
                <center>
                    <div class="dropdown" style={{ marginTop: '1em', display: 'inline-block' }}>
                        <button class="btn btn-outline-dark dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Action Plans</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.state.actionplan.map((single) => (
                                <a class="dropdown-item" onClick={this.findap.bind(this, single)}><span>{single.plan}</span></a>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: '2em', display: 'inline-block', marginLeft: '2em' }}>
                        <div class="form-check form-check-inline">
                            <input onClick={this.startup.bind(this)} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label class="form-check-label" for="inlineRadio1">No Of Startups</label></div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label class="form-check-label" for="inlineRadio2">No Of Incubes</label></div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                            <label class="form-check-label" for="inlineRadio3">To Fund</label></div>
                    </div>
                </center>
            </div>
        )
    }
}

export default withFauxDOM(Status);