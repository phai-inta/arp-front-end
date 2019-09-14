import * as React from 'react';
import '../App.css';
import { Typography, Card, Row, Col, Divider } from 'antd';

const { Title } = Typography;

export default class PricingCard extends React.Component {
  render() {
    const pricingData = this.props.data;

    const platform = pricingData.platform;
    const { windows, linux } = pricingData;

    const cards = {
      Windows: windows,
      Linux: linux
    };

    // const mediumEnginePrice =
    //   data.computeEngine.medium * data.computeEngine.mediumPrice;
    // const largeEnginePrice =
    //   data.computeEngine.large * data.computeEngine.largePrice;
    // const operationPrice = data.storage.operation * data.storage.operationPrice;
    // const capacityPrice = data.storage.capacityPrice;

    let total = 0;

    return (
      <Card bordered={false} title={platform}>
        {Object.keys(cards).map(key => {
          const data = cards[key];
          const { selectedValue, price } = data;

          total +=
            price.small +
            price.medium +
            price.large +
            price.disk +
            price.operation;

          return (
            <Card type="inner" title={key}>
              <Row>
                <Col>
                  <Title level={4}>Compute Engine</Title>
                </Col>
              </Row>

              <Row type="flex" justify="center">
                <Col span={5}>Small</Col>
                <Col span={3}>{selectedValue.small}</Col>
                <Col span={6}>instances</Col>
                <Col span={4}>{price.small}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={5}>Medium</Col>
                <Col span={3}>{selectedValue.medium}</Col>
                <Col span={6}>instances</Col>
                <Col span={4}>{price.medium}</Col>
              </Row>
              <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
                <Col span={5}>Large</Col>
                <Col span={3}>{selectedValue.large}</Col>
                <Col span={6}>instances</Col>
                <Col span={4}>{price.large}</Col>
              </Row>
              <Row>
                <Col>
                  <Title level={4}>Storage</Title>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Capacity</Col>
                <Col span={6}>{selectedValue.disk}</Col>
                <Col span={4}>GB</Col>
                <Col span={3}>${price.disk}</Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span={6}>Operations</Col>
                <Col span={6}>{selectedValue.operation}</Col>
                <Col span={4}>times</Col>
                <Col span={3}>${price.operation}</Col>
              </Row>
            </Card>
          );
        })}

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
