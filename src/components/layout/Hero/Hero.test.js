import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';
/* Na rozmowę
bez tego importu nie sprawdza propsów
*/
import 'jest-prop-type-error';

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(<Hero titleText='Lorem ipsum' imageSrc='test' />);
    expect(component).toBeTruthy();
    // console.log(component.debug());
  });

  /* Na rozmowę opcja z arrow func przechodzi bez propsów */
  // it('should throw error without required props', () => {
  //   expect(() => shallow(<Hero />)).toBeTruthy();
  // });

  it('should throw error without required props', () => {
    const component = () => shallow(<Hero />);
    expect(component).toThrow();
  });

  it('should render correct title and image', () => {
    const expectedTitle = 'Lorem ipsum';
    const expectedImage = 'image.jpg';
    const component = shallow(
      <Hero titleText={expectedTitle} imageSrc={expectedImage} />
    );

    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });

  it('renders correct classNames', () => {
    const mockVariants = 'small dummy';
    const component = shallow(
      <Hero titleText='Lorem' imageSrc='image.jpg' variant={mockVariants} />
    );
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
  });
});
