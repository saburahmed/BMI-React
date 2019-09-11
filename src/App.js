import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "User",
      weight: 0,
      height: 0,
      bmi: 0,
      message: "",
      optimalweight: "",
      time: new Date().toLocaleDateString()
    };
    this.submitMe = this.submitMe.bind(this);
    this.heightchange = this.heightchange.bind(this);
    this.weightchange = this.weightchange.bind(this);
    this.change = this.change.bind(this);
    this.ticker = this.ticker.bind(this);
    this.blur = this.blur.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
  }

  heightchange(e) {
    this.setState({ height: e.target.value });
    e.preventDefault();
  }

  blur(e) {
    this.calculateBMI();
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

  ticker() {
    this.setState({ time: new Date().toLocaleDateString() });
  }

  componentDidMount() {
    setInterval(this.ticker, 60000);
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
            <h1>THE BMI CHECKER</h1>
            <p>Let's help you get your BMI Status</p>
          </div>
          <form onSubmit={this.submitMe}>
            <label>Please enter your name</label>
            <input
              className="value-input"
              type="text"
              name="name"
              value={this.state.name}
              onBlur={this.blur}
              onChange={this.change}
            />
            <label>Enter your height in cm:</label>
            <input
              className="value-input"
              type="text"
              name="height"
              value={this.state.height}
              onBlur={this.blur}
              onChange={this.heightchange}
            />
            <label>Enter your weight in kg:</label>
            <input
              className="value-input"
              type="text"
              name="weight"
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
                <center>
                  <input className="button" type="reset" value="Reset" />
                </center>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
