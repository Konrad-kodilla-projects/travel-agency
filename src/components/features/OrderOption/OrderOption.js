import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';

import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  date: OrderOptionDate,
  text: OrderOptionText,
};

const OrderOption = ({ id, name, type, setOrderOption, ...otherProps }) => {
  const OptionComponent = optionTypes[type];

  if (OptionComponent) {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          {...otherProps}
          setOptionValue={value => setOrderOption({ [id]: value })}
        />
      </div>
    );
  }
};

/* Na rozmowę
w zadaniu ten komponent jako else zwracał null -> 
czy komponent musi coś zwracać czy może być tak jak jak to zrobiłem tutaj?
*/

OrderOption.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setOrderOption: PropTypes.func.isRequired,
};

export default OrderOption;
