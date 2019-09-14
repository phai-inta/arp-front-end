import React from 'react';
import CloudResources from '../components/cloudResources';
import PricingReview from '../components/pricingReview';
import Button from 'antd/es/button';
import { Typography, Row, Col } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const azureCalculateData = {
  computeEngine: {
    windows: { small: 316.82, medium: 1267.28, large: 3801.84 },
    linux: { small: 182.5, medium: 730, large: 2190 }
  },
  storage: {
    operationPrices: 0.002,
    smallDiskPrice: 26.112,
    mediumDiskPrice: 52.224,
    largeDiskPrice: 104.448
  }
};

const round = (value, decimals = 2) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export default class CloudReview extends React.Component {
  state = {
    isLoading: true,
    pricingData: {
      platform: 'Azure',
      windows: {
        selectedValue: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        },
        price: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        }
      },
      linux: {
        selectedValue: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        },
        price: {
          small: 0,
          medium: 0,
          large: 0,
          disk: 0,
          operation: 0
        }
      }
    }
  };

  async componentDidMount() {
    const response = await axios.get('http://localhost:7000');
    this.setState({
      azureCalculateData: response.data,
      isLoading: false
    });
  }

  onStorageSelected = ({ type, value, os }) => {
    const storagePrice =
      type === 'disk'
        ? this.state.azureCalculateData.storage.smallDiskPrice
        : this.state.azureCalculateData.storage.operationPrices;

    const priceValue = storagePrice * value;
    let newPrice = { ...this.state.pricingData[os].price };
    let newSelected = { ...this.state.pricingData[os].selectedValue };
    newPrice[type] = round(priceValue, 2);
    newSelected[type] = value;

    this.setState(prev => {
      let pricingData = JSON.parse(JSON.stringify(prev.pricingData));
      const result = {
        selectedValue: newSelected,
        price: newPrice
      };

      pricingData[os] = result;
      return { pricingData };
    });
  };

  onComputeSelected = ({ size, value, os }) => {
    // Calculate tier small, medium, large
    const priceValue =
      this.state.azureCalculateData.computeEngine[os][size] * value;
    let newPrice = { ...this.state.pricingData[os].price };
    let newSelected = { ...this.state.pricingData[os].selectedValue };
    newPrice[size] = round(priceValue, 2);
    newSelected[size] = value;

    this.setState(prev => {
      let pricingData = JSON.parse(JSON.stringify(prev.pricingData));
      const result = {
        selectedValue: newSelected,
        price: newPrice
      };

      pricingData[os] = result;
      return { pricingData };
    });
  };

  handleClick = () => {
    console.log('backbtn is clicked');
  };

  render() {
    if (this.state.isLoading) {
      return <p>fetching data, please wait...</p>;
    }

    return (
      <div className="App">
        <Title level={2}>Choose your cloud resources</Title>
        <Row style={{ marginTop: 40 }}>
          <Col span={12}>
            <Title level={4}>Window</Title>
            <CloudResources
              os="windows"
              onComputeSelected={this.onComputeSelected}
              onStorageSelected={this.onStorageSelected}
            />
          </Col>
          <Col span={12}>
            <Title level={4}>Linux</Title>
            <CloudResources
              os="linux"
              onComputeSelected={this.onComputeSelected}
              onStorageSelected={this.onStorageSelected}
            />
          </Col>
        </Row>

        <PricingReview
          selectedValue={this.state.selectedValue}
          platform={this.state.platform}
          data={this.state.pricingData}
        />

        <Row
          type="flex"
          justify="center"
          style={{ marginBottom: 40, marginTop: 40 }}
        >
          <Col span={4}>
            <Button size="large" onClick={this.handleClick}>
              Go back
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}