import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

import pricing from '../../../data/pricing.json';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, trip) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  const {url, endpoint: {orders} } = settings.db;
  const {id, country} = trip;

  if (options.contact.length > 0 && options.name.length > 0 ){
    const payload = {
      ...options,
      totalCost,
      tripID: id,
      country: country.name,
      code: country.code,
    };
    
    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  
    fetch(url + '/' + orders, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
        alert('Order has been sent');
      });
  } else {
    alert('Your name and contact info are required');
  }
};

const OrderForm = ({ tripCost, options, setOrderOption, trip }) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption
          {...option}
          currentValue={options[option.id]}
          setOrderOption={setOrderOption}
          tripCost={tripCost}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} />
    </Col>
    <Button onClick={() => sendOrder(options, tripCost, trip)}>Order now!</Button>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
};

export default OrderForm;
