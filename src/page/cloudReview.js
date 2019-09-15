import React from 'react';
import CloudResources from '../components/cloudResources';
import PricingReview from '../components/pricingReview';
import Button from 'antd/es/button';
import { Typography, Row, Col } from 'antd';
import axios from 'axios';

const { Title } = Typography;

    /*
      hard-coded prices for development purpose
    */
// const azureCalculateData = {
//   computeEngine: {
//     windows: { small: 316.82, medium: 1267.28, large: 3801.84 },
//     linux: { small: 182.5, medium: 730, large: 2190 }
//   },
//   storage: {
//     operationPrices: 0.002,
//     smallDiskPrice: 26.112,
//     mediumDiskPrice: 52.224,
//     largeDiskPrice: 104.448
//   }
// };

    /*
      source:  https://www.jacklmoore.com/notes/rounding-in-javascript/
    */
const round = (value, decimals = 2) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

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
    /*
      by-pass cors issue
    */
    const response = await axios.get('http://localhost:7000');
    this.setState({
      azureCalculateData: response.data,
      isLoading: false
    });

    /*
      don't know how to make use of a response from random.js, so i moved all functions here
      and found the cors issue
    */
  //   const HOURS_PER_MONTH = 730;
  //   try{
  //   const rateResponse = await axios.get(
  //     'https://api.exchangeratesapi.io/latest?base=USD&symbols=AUD'
  //   );
  //   const exchangeRate = rateResponse.data['rates']['AUD'];
  //   console.log(rateResponse.data);
  //   //return exchangeRate;

  //   const response = await axios.get(
  //     'https://azure.microsoft.com/api/v3/pricing/virtual-machines/calculator/?culture=en-us&discount=mosp&v=20190910-1131-88025'
  //   );
  //   const smallWindows = response.data['offers']['windows-d4v3-standard'];
  //   const smallWindowsMonthly =
  //     smallWindows['prices']['perhour']['australia-southeast']['value'] *
  //     exchangeRate *
  //     HOURS_PER_MONTH;
  //   const mediumWindows = response.data['offers']['windows-d16v3-standard'];
  //   const mediumWindowsMonthly =
  //     mediumWindows['prices']['perhour']['australia-southeast']['value'] *
  //     exchangeRate *
  //     HOURS_PER_MONTH;
  //   const largeWindows = response.data['offers']['windows-d48v3-standard'];
  //   const largeWindowsMonthly =
  //     largeWindows['prices']['perhour']['australia-southeast']['value'] *
  //     exchangeRate *
  //     HOURS_PER_MONTH;
  //   const smallLinux = response.data['offers']['linux-d4v3-standard'];
  //   const smallLinuxMonthly =
  //     smallLinux['prices']['perhour']['australia-southeast']['value'] *
  //     exchangeRate *
  //     HOURS_PER_MONTH;
  //   const mediumLinux = response.data['offers']['linux-d16v3-standard'];
  //   const mediumLinuxMonthly =
  //     mediumLinux['prices']['perhour']['australia-southeast']['value'] *
  //     exchangeRate *
  //     HOURS_PER_MONTH;
  //   const largeLinux = response.data['offers']['linux-d48v3-standard'];
  //   const largeLinuxMonthly =
  //     largeLinux['prices']['perhour']['australia-southeast']['value'] *
  //     exchangeRate *
  //     HOURS_PER_MONTH;
  //   const computeEnginePrices = {
  //     windows: {
  //       small: smallWindowsMonthly,
  //       medium: mediumWindowsMonthly,
  //       large: largeWindowsMonthly
  //     },
  //     linux: {
  //       small: smallLinuxMonthly,
  //       medium: mediumLinuxMonthly,
  //       large: largeLinuxMonthly
  //     }
  //   };
  //   console.log("computeengin " + computeEnginePrices.data);
  //   return computeEnginePrices;
  // } catch (error) {
  //   console.log(
  //     'Something has gone wrong while retrieving compute engine pricing for Azure'
  //   );
  // }
  }

//  onPlatformSelected = ({ type }) => {
//    const platform = type === 'azure'
//       ? this.state.azureCalculateData.platform
//       : this.state.azureCalculateData.
//  }

  /*
    type = small, medium, large
    value = input
    os = window, linux
  */
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
              //platform
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