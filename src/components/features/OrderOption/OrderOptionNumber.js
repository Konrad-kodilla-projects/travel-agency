import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../../../utils/formatPrice';
import { parseOptionPrice } from '../../../utils/parseOptionPrice';

import styles from './OrderOption.scss';

const OrderOptionNumber = ({
  currentValue,
  setOptionValue,
  limits,
  price,
  tripCost,
}) => (
  <div className={styles.number}>
    <input
      type='number'
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={() => setOptionValue(Number(event.target.value))}
    />{' '}
    {formatPrice(
      parseOptionPrice(price).value *
        parseOptionPrice(tripCost).value *
        currentValue
    )}
  </div>
);

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number,
  setOptionValue: PropTypes.func.isRequired,
  limits: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  tripCost: PropTypes.string.isRequired,
};

export default OrderOptionNumber;
