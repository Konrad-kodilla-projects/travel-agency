import React from 'react'; 
import PropTypes from 'prop-types';

import { formatPrice } from '../../../utils/formatPrice';

import styles from './OrderOption.scss';

const newValueSet = (currentValue, id, checked) => {
  if (checked) {
    return [...currentValue, id];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = ({
  values,
  currentValue,
  setOptionValue,
}) => (
  <div className={styles.checkboxes}>
    {values.map(value => (
      <label htmlFor={value.id} key={value.id}>
        <input
          type='checkbox'
          value={value.id}
          checked={currentValue.includes(value.id)}
          onChange={event =>
            setOptionValue(
              newValueSet(currentValue, value.id, event.target.checked)
            )
          }
        />
        {value.name + ' '}
        {formatPrice(value.price)}
      </label>
    ))}
  </div>
);

OrderOptionCheckboxes.propTypes = {
  currentValue: PropTypes.array,
  setOptionValue: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

export default OrderOptionCheckboxes;
