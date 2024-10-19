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
    console.log(vals);

    var margin = { top: 50, right: 10, bottom: 50, left: 30 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // axes
    const x_data = vals.map((item) => item.day);
    const y_data = vals.map((item) => item.tip);
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
