import * as React from "react";
import Button from "antd/es/button";
import IntegerStep from "./integerStep";
import {
  Typography,
  Select,
  Row,
  Col
} from "antd";
import "../App.css";

const { Title } = Typography;
const { Option } = Select;
const engineMarks = {
  5: "5",
  10: "10",
  15: "15",
  20: "20"
};
const storageMarks = {
  5: "5",
  10: "10",
  15: "15",
  20: "20",
  30: "30",
  40: "40",
  50: "50"
};
const computeEngineMin = 0;
const computeEngineMax = 20;
const diskMin = 0;
const diskMax = 1000;
const operationMin = 0;
const operationMax = 1000;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const computeEngineTiers = ["small", "medium", "large"];

export default class CloudResources extends React.Component {
  state = {
    inputValue: 0
  };

  onInputChange = value => {
    this.setState({
      inputValue: value
    });
    this.props.input(value);
    //console.log("cloudResource state " + value);
  }

    render() {
      const computeEngine = computeEngineTiers.map(tier => (
        <Row type="flex" justify="center" key={tier} id={tier}>
          <Col span={3}> {capitalizeFirstLetter(tier)}</Col>
          <Col span={10}>
            <IntegerStep
              min={computeEngineMin}
              max={computeEngineMax}
              marks={engineMarks}
              selectedValue={this.onInputChange}
            />
          </Col>
          <Col span={1}>instance(s)</Col>
        </Row>
      ));
  
      return (
        <div className="App">
          <Title level={2}>Choose your cloud resources</Title>
          <Title level={4}>Compute Engines</Title>
          {/* <p style={sm([ styles.textBold, styles.mar5, styles.textCenter, styles.marBot20, styles.fs18 ])}>Choose your usage tier</p> */}
          {computeEngine}
          <Title level={4}>Storage</Title>
          <Row type="flex" justify="center">
            <Col span={3}> Capacity</Col>
            <Col span={10}>
              <IntegerStep
                min={diskMin}
                max={diskMax}
                marks={storageMarks}
                selectedValue={this.onInputChange}
              />
            </Col>
            <Col span={1}>time(s)</Col>
              {/* <Select defaultValue="gb" style={{ width: 120 }}>
                <Option value="gb">GB</Option>
                <Option value="tb">TB</Option>
              </Select>
            </Col> */}
          </Row>
          <Row type="flex" justify="center" style={{ marginBottom: 40 }}>
            <Col span={3}> Operation/Transaction</Col>
            <Col span={10}>
              <IntegerStep
                min={operationMin}
                max={operationMax}
                marks={storageMarks}
                selectedValue={this.onInputChange}
              />
            </Col>
            <Col span={1}>time(s)</Col>
          </Row>
        </div>
      );
    }
}