import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';

import styles from './OrderOption.scss';

const OrderOptionIcons = ({
  values,
  required,
  currentValue,
  setOptionValue,
}) => (
  <div
    className={styles.component}
    // value={currentValue}
    // onChange={event => setOptionValue(event.currentTarget.value)}
  >
    {required ? '' : (
      // setOptionValue('')
      <div onClick={setOptionValue('')}>
        <Icon name='times-circle' />
        none
      </div>
    )}
    {values.map(value => (
      <div
        key={value.id}
        className={`${styles.icon} ${value.id === currentValue ? styles.iconActive : null}`}

        /* Tutaj ten onClick zrobilem bo nie miałem lepszego pomysłu bo */
        // onClick={setOptionValue.bind(value.id)}
        // wywalało mi błąd

        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon}/>
        {value.name} {formatPrice(value.price)}
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  values: PropTypes.array.isRequired,
};

export default OrderOptionIcons;
