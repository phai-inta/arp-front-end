import * as React from 'react';
import PricingCard from './pricingCard';
import '../App.css';
import { Typography, Row, Col } from 'antd';

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
