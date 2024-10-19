import { Component } from "react";
import * as d3 from "d3";
import "./App.css";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data;
    var margin = { top: 50, right: 10, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;
    var container = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x axis
    var x_data = data.map((item) => item.total_bill);
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(x_data)])
      .range([margin.left, w]);
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // y axis
    var y_data = data.map((item) => item.tip);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y_scale));

    // data points
    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.total_bill);
      })
      .attr("cy", function (d) {
        return y_scale(d.tip);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");

    // labels
    const title = container
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", `translate(150, -40)`);
    title.append("text").attr("x", 50).attr("y", 50).text("Total Bill vs Tips");

    const yAxis = container
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", `translate(100, 0)`)
      // .attr("transform", "rotate(-90)");
    yAxis.append("text").attr("x", 50).attr("y", 50).text("Tips");
  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1">
          {" "}
          <g style={{ height: 50, width: 100 }} fontSize="10">
            help
          </g>
        </g>
      </svg>
    );
  }
}

export default Child1;
