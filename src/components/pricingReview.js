import * as React from 'react';
import PricingCard from './pricingCard';
import '../App.css';
import { Row, Col } from 'antd';

class PricingReview extends React.Component {
  render() {
    const pricingData = this.props.data;

    return (
      <div style={{ background: '#ECECEC', padding: '15px' }}>
        <Row>
          <Col span={12}>
            <PricingCard data={pricingData} />
          </Col>
          <Col span={12}>
            <PricingCard data={pricingData} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PricingReview;
