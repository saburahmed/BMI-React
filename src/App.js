import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Joe Rex",
      weight: "eg 60",
      height: "eg 160",
      bmi: 0,
      message: "",

      optimalweight: "",
      time: new Date().toLocaleDateString()
    };
    this.submitMe = this.submitMe.bind(this);
    this.heightchange = this.heightchange.bind(this);
    this.weightchange = this.weightchange.bind(this);
    this.change = this.change.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
  }

  heightchange(e) {
    this.setState({ height: e.target.value });
    e.preventDefault();
  }

  weightchange(e) {
    this.setState({ weight: e.target.value });
    e.preventDefault();
  }

  calculateBMI() {
    let heightSquared = ((this.state.height / 100) * this.state.height) / 100;
    let bmi = this.state.weight / heightSquared;
    let low = Math.round(18.5 * heightSquared);
    let high = Math.round(24.99 * heightSquared);
    let message = "";
    if (bmi >= 18.5 && bmi <= 24.99) {
      message =
        "You are in a Healthy weight range. By maintaining a healthy weight, you lower your risk of developing serious health problems";
    } else if (bmi >= 25 && bmi <= 29.9) {
      message =
        "You are Overweight! Your health may be at risk if you don't loose weight. You are recommended to talk to your Doctor or Dietician for advice.";
    } else if (bmi >= 30) {
      message =
        "You are Obese! Your health may be at risk if you don't loose weight. You are recommended to talk to your Doctor or Dietician for advice.";
    } else if (bmi < 18.5) {
      message =
        "You are Underweight, so you may need to put on some weight. You are recommended to ask your Doctor or Dietician for advice.";
    }
    this.setState({ message: message });
    this.setState({
      optimalweight:
        "Your suggested weight range is between " +
        low +
        "kg " +
        " and " +
        high +
        "kg"
    });
    this.setState({ bmi: Math.round(bmi * 100) / 100 });
  }

  submitMe(e) {
    e.preventDefault();
    this.calculateBMI();
  }

  change(e) {
    e.preventDefault();
    console.log(e.target);
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="app-container">
        <div className="App">
          <div className="App-header">
            <h2>THE BMI CHECKER</h2>
            <p>Let's help you get your BMI Status</p>
          </div>
          <form onSubmit={this.submitMe}>
            <label>Please enter your name</label>
            <input
              className="value-input"
              type="text"
              name="name"
              placeholder="eg Joe Rex"
              value={this.state.name}
              onChange={this.change}
            />
            <label>Enter your height in cm:</label>
            <input
              className="value-input"
              type="text"
              name="height"
              placeholder="eg 160"
              value={this.state.height}
              onChange={this.heightchange}
            />
            <label>Enter your weight in kg:</label>
            <input
              className="value-input"
              type="text"
              name="weight"
              placeholder="eg 60"
              value={this.state.weight}
              onChange={this.weightchange}
            />
            <div className="result">
              <label>
                Hello {this.state.name}, your BMI as at {this.state.time} is{" "}
                {this.state.bmi}
              </label>

              <label>{this.state.message}</label>

              <label>{this.state.optimalweight}</label>
            </div>
            <div className="btn-wrapper">
              <input className="button" type="submit" value="Calculate" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;

// <center>
//   <input className="button" type="reset" value="Reset" />
// </center>;

// <div className="btn-wrapper">
// <input className="button" type="submit" value="Calculate" />
// </div>
