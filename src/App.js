import React from "react";
import Button from "antd/es/button";
import {
  Typography,
  Slider,
  InputNumber,
  Select,
  Card,
  Row,
  Col,
  Divider
} from "antd";
import "./App.css";

const { Title } = Typography;
const { Option } = Select;
const engineMarks = {
  5: "5",
  10: "10",
  15: "15",
  20: "20"
};
const storageMarks = {
  100: "100",
  200: "200",
  300: "300",
  400: "400",
  500: "500",
  600: "600",
  700: "700",
  800: "800",
  900: "900",
  1000: "1000"
};
const computeEngineMin = 0;
const computeEngineMax = 20;
const storageMin = 0;
const storageMax = 1000;
const operationMin = 0;
const operationMax = 1000;

const pricingData = {
  platform: "Azure",
  computeEngine: {
    small: 3,
    medium: 2,
    large: 0,
    smallPrice: 150, // average price for one small instance
    mediumPrice: 200,
    largePrice: 250
  },
  storage: {
    capacity: 450,
    capacityUnit: "GB",
    capacityPrice: 60, //for 450gb
    operation: 1000,
    operationPrice: 0.02 // per operation
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const computeEngineTiers = ["small", "medium", "large"];

class App extends React.Component {
  render() {
    const computeEngine = computeEngineTiers.map(tier => (
      <Row type="flex" justify="center" key={tier} id={tier}>
        <Col span={3}> {capitalizeFirstLetter(tier)}</Col>
        <Col span={10}>
          <IntegerStep
            min={computeEngineMin}
            max={computeEngineMax}
            marks={engineMarks}
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
              min={storageMin}
              max={storageMax}
              marks={storageMarks}
            />
          </Col>
          <Col span={1}>
            <Select defaultValue="gb" style={{ width: 120 }}>
              <Option value="gb">GB</Option>
              <Option value="tb">TB</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: 40 }}>
          <Col span={3}> Operation</Col>
          <Col span={10}>
            <IntegerStep
              min={operationMin}
              max={operationMax}
              marks={storageMarks}
            />
          </Col>
          <Col span={1}>time(s)</Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: 40 }}>
          <Col span={4}>
            <Button type="primary" size="large">
              Confirm
            </Button>
          </Col>
          <Col span={4}>
            <Button size="large">Go back</Button>
          </Col>
        </Row>
        <PricingReview />
      </div>
    );
  }
}

class PricingReview extends React.Component {
  render() {
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <PricingCard data={pricingData} />
          </Col>
          <Col span={8}>
            <PricingCard data={pricingData} />
          </Col>
          <Col span={8}>
            <PricingCard data={pricingData} />
          </Col>
        </Row>
      </div>
    );
  }
}

class PricingCard extends React.Component {
  render() {
    const data = this.props.data;
    const smallEnginePrice =
      data.computeEngine.small * data.computeEngine.smallPrice;
    const mediumEnginePrice =
      data.computeEngine.medium * data.computeEngine.mediumPrice;
    const largeEnginePrice =
      data.computeEngine.large * data.computeEngine.largePrice;
    const operationPrice = data.storage.operation * data.storage.operationPrice;
    const capacityPrice = data.storage.capacityPrice;
    const total =
      smallEnginePrice +
      mediumEnginePrice +
      largeEnginePrice +
      operationPrice +
      capacityPrice;
    return (
      <Card bordered={false} title={data.platform}>
        <Row>
          <Col>
            <Title level={4}>Compute Engine</Title>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={3}>Small</Col>
          <Col span={3}>{data.computeEngine.small}</Col>
          <Col span={3}>instances</Col>
          <Col span={3}>${smallEnginePrice}</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={3}>Medium</Col>
          <Col span={3}>{data.computeEngine.medium}</Col>
          <Col span={3}>instances</Col>
          <Col span={3}>${mediumEnginePrice}</Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
          <Col span={3}>Large</Col>
          <Col span={3}>{data.computeEngine.large}</Col>
          <Col span={3}>instances</Col>
          <Col span={3}>${largeEnginePrice}</Col>
        </Row>
        <Row>
          <Col>
            <Title level={4}>Storage</Title>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={3}>Capacity</Col>
          <Col span={5}>{data.storage.capacity}</Col>
          <Col span={3}>{data.storage.capacityUnit}</Col>
          <Col span={3}>${capacityPrice}</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={3}>Operations</Col>
          <Col span={5}>{data.storage.operation}</Col>
          <Col span={3}>times</Col>
          <Col span={3}>${operationPrice}</Col>
        </Row>
        <Divider />
        <Row type="flex" justify="center">
          <Col span={5}>
            <Title level={4}>Total</Title>
          </Col>
          <Col span={5}>
            <Title level={4}>${total}</Title>
          </Col>
        </Row>
      </Card>
    );
  }
}

class IntegerStep extends React.Component {
  state = {
    inputValue: 1
  };

  onChange = value => {
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Row>
        <Col span={18}>
          <Slider
            min={this.props.min}
            max={this.props.max}
            marks={this.props.marks}
            onChange={this.onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={this.props.min}
            max={this.props.max}
            style={{ marginLeft: 24 }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}

export default App;
