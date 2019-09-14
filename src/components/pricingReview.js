import * as React from 'react';
import PricingCard from './pricingCard';
import '../App.css';
import { Typography, Card, Row, Col, Divider } from 'antd';

const { Title } = Typography;

// const pricingData = {
//   platform: "Azure",
//   computeEngine: {
//     small: 3,
//     medium: 2,
//     large: 0,
//     smallPrice: 150, // average price for one small instance
//     mediumPrice: 200,
//     largePrice: 250
//   },
//   storage: {
//     capacity: 450,
//     capacityUnit: "GB",
//     capacityPrice: 60, //for 450gb
//     operation: 1000,
//     operationPrice: 0.02 // per operation
//   }
// };

class PricingReview extends React.Component {
  render() {
    const pricingData = this.props.data;

    return (
      <div style={{ background: '#ECECEC', padding: '15px' }}>
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

export default PricingReview;
