import { Component } from "react";
import "./App.css";
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from "d3";
import tips from "./tips.csv";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    var self = this;
    d3.csv(tips, function (d) {
      return {
        tip: parseFloat(d.tip),
        total_bill: parseFloat(d.total_bill),
        day: d.day,
      };
    })
      .then((csv_data) => {
        self.setState({ data: csv_data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="parent">
        <div className="child1">
          <Child1 data={this.state.data} />
        </div>
        <div className="child2">
          <Child2 data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
