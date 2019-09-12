import * as React from "react";
import "../App.css";
import {
  Typography,
  Card,
  Row,
  Col,
  Divider
} from "antd";

const { Title } = Typography;

export default class PricingCard extends React.Component {
  render() {
    const pricingData = this.props.data;
    const data = pricingData.selectedValue;
    const platform = pricingData.platform;
    const smallPrice = pricingData.smallPrice;
    const smallEnginePrice = data * smallPrice;
    
    // const mediumEnginePrice =
    //   data.computeEngine.medium * data.computeEngine.mediumPrice;
    // const largeEnginePrice =
    //   data.computeEngine.large * data.computeEngine.largePrice;
    // const operationPrice = data.storage.operation * data.storage.operationPrice;
    // const capacityPrice = data.storage.capacityPrice;
    
    const total =
      smallEnginePrice
    return (
      <Card bordered={false} title={platform}>
        <Row>
          <Col>
            <Title level={4}>Compute Engine</Title>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={5}>Small</Col>
          <Col span={3}>{data}</Col>
          <Col span={6}>instances</Col>
          <Col span={4}>{smallEnginePrice}</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={5}>Medium</Col>
          <Col span={3}>{data}</Col>
          <Col span={6}>instances</Col>
          <Col span={4}>{smallEnginePrice}</Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
          <Col span={5}>Large</Col>
          <Col span={3}>{data}</Col>
          <Col span={6}>instances</Col>
          <Col span={4}>{smallEnginePrice}</Col>
        </Row>
        <Row>
          <Col>
            <Title level={4}>Storage</Title>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={6}>Capacity</Col>
          <Col span={6}>450</Col>
          <Col span={4}>GB</Col>
          <Col span={3}>${smallEnginePrice}</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={6}>Operations</Col>
          <Col span={6}>1000</Col>
          <Col span={4}>times</Col>
          <Col span={3}>${smallEnginePrice}</Col>
        </Row>
        <Divider />
        <Row type="flex" justify="center">
          <Col span={5}>
            <Title level={4}>Total</Title>
          </Col>
          <Col span={5}>
            <Title level={4}>AUD{total}</Title>
          </Col>
        </Row>
      </Card>
    );
  }
}