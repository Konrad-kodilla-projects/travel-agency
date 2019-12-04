import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';
import 'jest-prop-type-error';

describe('Component TripSummary', () => {
  const expectedImage = 'image.jpg';
  const expectedName = 'testName';
  const expectedId = 'id';
  const link = '/trip/' + expectedId;
  const [cost, days] = ['$10,000', 10];

  it('should render correct compoment with props', () => {
    const component = shallow(
      <TripSummary
        id={expectedId}
        image={expectedImage}
        name={expectedName}
        tags={[]}
        cost={cost}
        days={days}
      />
    );

    expect(component.find('.link').prop('to')).toEqual(link);
    expect(component.find('img').props()).toEqual({
      src: 'image.jpg',
      alt: 'testName',
    });
    expect(
      component
        .find('.details span')
        .first()
        .text()
    ).toEqual(days + ' days');
    expect(
      component
        .find('.details span')
        .last()
        .text()
    ).toEqual('from ' + cost);
  });

  /* Na rozmowę
  jak sprawdzić po kolei wszystkie propsy tzn usuwać jeden i sprawdzać czy
  rzuca bez niego błąd
  */
  // it('should throw error without any of required props', () => {
  //   const component = shallow(
  //     <TripSummary
  //       id={expectedId}
  //       image={expectedImage}
  //       name={expectedName}
  //       tags={[]}
  //       cost={cost}
  //       days={days}
  //     />
  //   );

  //   component.setProps()
  // });

  it('should throw error without required props', () => {
    const component = () => shallow(<TripSummary />);
    expect(component).toThrow();
  });
});
