import React from "react";
import CloudResources from "../components/cloudResources";
import PricingReview from "../components/pricingReview";
import Button from "antd/es/button";
import {
  Row,
  Col
} from "antd";

export default class CloudReview extends React.Component {
  state = {
    pricingData: { 
      platform: "Azure", 
      selectedValue: 0,
      smallPrice: 0 }
  };
  
  onInputChange = value => {
    this.setState({
      pricingData: { 
      platform: "Azure", 
      selectedValue: value, 
      smallPrice: 150 }
    });
  }

  handleClick = () => {
    console.log("backbtn is clicked")
  }

  render() {
    return (
      <div>
        <CloudResources input={this.onInputChange} />
        <PricingReview selectedValue={this.state.selectedValue} 
          platform={this.state.platform}
          smallPrice={this.state.smallPrice}
          test={this.state.pricingData} />

        <Row type="flex" justify="center" style={{ marginBottom: 40, marginTop: 40 }}>
            <Col span={4}>
              <Button size="large" onClick={this.handleClick}>Go back</Button>
            </Col>
          </Row>
      </div>
    );
  }
}