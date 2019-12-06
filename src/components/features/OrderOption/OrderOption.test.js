import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

const requiredProps = {
  id: 'abc',
  name: 'test name',
  type: 'text',
  setOrderOption: () => ({}),
};

const createComponent = props => shallow(<OrderOption {...props} />);

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

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
  tripCost: '$10,110',
  setOrderOption: () => ({}),
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component, subcomponent, mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = createComponent({
        type: type,
        ...mockProps,
        ...mockPropsForType[type],
        setOrderOption: mockSetOrderOption,
      });
      subcomponent = component.find(optionTypes[type]).dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = subcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          subcomponent
            .find('select')
            .simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
      case 'checkboxes': {
        it('contains checkboxes wrapper and inputs', () => {
          const wrapper = subcomponent.find('.checkboxes');
          expect(wrapper.length).toBe(1);

          const inputs = wrapper.find('input[type="checkbox"]');
          expect(inputs.length).toBe(mockProps.values.length);
          Object.keys(inputs).map((input, id) =>
            expect(input.at(id).prop('value')).toBe(mockProps.values[id].id)
          );
        });
        it('should run setOrderOption function on change', () => {
          subcomponent
            .find(`input[value="${testValue}"]`)
            .simulate('change', { target: { checked: true } });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: [mockProps.currentValue, testValue],
          });
        });
        break;
      }
      case 'icons': {
        it('contains icon divs', () => {
          // Test empty option
          expect(subcomponent.find('Icon[name="times-circle"]').length).toBe(1);

          const icons = subcomponent
            .find('Icon')
            .not('Icon[name="times-circle"]');
          Object.keys(icons).map((icon, id) =>
            expect(icon.at(id).prop('name')).toBe(mockProps.values[id].name)
          );
        });

        it('should run setOrderOption function on click', () => {
          subcomponent
            .find('.icon')
            .last()
            .simulate('click');

          /* Napisałem w to be callled 2 bo jak required jest false to z automatu
            strzela funkcja z pustym stringiem -> czy tak ma być czy coś zmieniać
            w pliku OrderOptionIcons żeby strzelała tylko raz? */
          expect(mockSetOrderOption).toBeCalledTimes(2);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
      case 'number': {
        it('contains input and value', () => {
          const input = subcomponent.find('.inputSmall');
          expect(input.length).toBe(1);
          expect(input.prop('value')).toBe(
            mockPropsForType.number.currentValue
          );
        });

        it('should run setOrderOption function on change', () => {
          subcomponent.find('.inputSmall').simulate('change', {
            target: { value: testValueNumber },
          });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValueNumber,
          });
        });
        break;
      }
      case 'text': {
        it('contains input', () => {
          expect(subcomponent.find('input[type="text"]').length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          subcomponent.find('input[type="text"]').simulate('change', {
            target: { value: testValue },
          });

          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
      case 'date': {
        it('renders Date Picker', () => {
          // console.log(subcomponent.debug());
          const DatePicker = subcomponent.find('t');
          expect(DatePicker.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          subcomponent.find('t').simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });

        break;
      }
    }
  });
}
