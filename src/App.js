import React, { Component } from "react";
//import { BrowserRouter, Route } from "react-router-dom";
import CloudReview from "./page/cloudReview";

export default class App extends Component {
  render() {
    return (
      <div style={{ marginTop: "30px" }}>
        <CloudReview />
      </div>
    );
  }
}