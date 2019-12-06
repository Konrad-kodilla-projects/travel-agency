import React from 'react';
import PropTypes from 'prop-types';

const OrderOptionText = ({ id, setOptionValue }) => (
  <div>
    <input
      type='text'
      id={id}
      onChange={event => setOptionValue(event.target.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  id: PropTypes.string,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionText;
