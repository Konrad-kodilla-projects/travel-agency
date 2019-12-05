import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

const requiredProps = {
  id: 'abc',
  name: 'test name',
  type: 'text',
  setOrderOption: () => ({}),
};

const createComponent = ({ id, name, type, setOrderOption }) =>
  shallow(
    <OrderOption
      id={id}
      name={name}
      type={type}
      setOrderOption={setOrderOption}
    />
  );

describe('Component OrderOption', () => {
  it('renders with props', () => {
    const component = createComponent(requiredProps);
    expect(component).toBeTruthy();
  });

  it('returns empty object if called without type prop', () => {
    const component = createComponent({ ...requiredProps, type: null });
    expect(component).toEqual({});
  });

  it('renders correct name', () => {
    const component = createComponent(requiredProps);
    expect(component.find('.title').text()).toEqual(requiredProps.name);
  });
});

/* Test Option Components */
const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component, subcomponent, currentValue;
    subcomponent;
    /* całą tą część zrobiłem żeby nie usuwać isRequired
     z PropTypes tych kompotentów */

    switch (type) {
      case 'number':
        currentValue = 1;
        break;
      case 'dropdown' || 'icons':
        currentValue = '';
        break;
      case 'checkboxes':
        currentValue = [];
        break;
    }

    const optionProps = {
      values: [],
      currentValue: currentValue,
      limits: {},
      price: '',
      tripCost: '',
    };

    beforeEach(() => {
      /* to mi nie przekazywało propsów do tego komponentu poziom niżej
      więc napisałem tą drugą opcję i ona chodzi*/
      // component = createComponent({
      //   ...requiredProps,
      //   type: type,
      //   ...optionProps,
      // });

      component = createComponent({
        ...requiredProps,
        type: null,
      });
      component.setProps({
        type: type,
        ...optionProps,
      });
      subcomponent = component.find(optionTypes[type]).dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(1).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        break;
      }
    }
  });
}
