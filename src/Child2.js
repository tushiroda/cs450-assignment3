import { Component } from "react";
import * as d3 from "d3";
import "./App.css";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    var data = this.props.data;
    const groupedByDay = d3
      .nest()
      .key(function (d) {
        return d.day;
      })
      .entries(data);

    var vals = [];
    groupedByDay.forEach((element) => {
      const dayTips = element.values.map((row) => row.tip);
      var temp = {};
      temp["day"] = element.key;
      temp.tip = d3.mean(dayTips);
      vals.push(temp);
    });

    // barchart stuff
    var margin = { top: 50, right: 10, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;
    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // axes data
    const x_data = vals.map((item) => item.day);
    const y_data = vals.map((item) => item.tip);

    // x axis
    const x = d3
      .scaleBand()
      .domain(x_data)
      .range([margin.left, w])
      .padding(0.2);
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x));

    // y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // data
    container
      .selectAll("mybar")
      .data(vals)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.day);
      })
      .attr("y", function (d) {
        return y(d.tip);
      })
      .attr("width", 80)
      .attr("height", function (d) {
        return h - y(d.tip);
      })
      .attr("fill", "#69b3a2");

    // labels
    const labels = container.selectAll("g").data(data).enter().append("g");
    labels
      .append("text")
      .attr("x", 200)
      .attr("y", -10)
      .text("Average Tip by Day");
    labels
      .append("text")
      .attr("transform", "translate(10,130)rotate(-90)")
      .text("Average Tip");
    labels.append("text").attr("transform", "translate(240,235)").text("Day");
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
