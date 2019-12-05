import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  const expectedImage = 'image.jpg';
  const expectedName = 'testName';
  const expectedId = 'id';
  const link = '/trip/' + expectedId;
  const [cost, days] = ['$10,000', 10];

  const allProps = {
    id: expectedId,
    image: expectedImage,
    name: expectedName,
    tags: [],
    cost: cost,
    days: days,
  };

  const createComponent = ({id, image, name, tags, cost, days}) =>
    shallow(
      <TripSummary
        id={id}
        image={image}
        name={name}
        tags={tags}
        cost={cost}
        days={days}
      />
    );

  it('should render correct compoment with props', () => {
    const component = createComponent(allProps);

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

  it('should throw error without any of required props', () => {

    Object.keys(allProps).forEach(myProp => {
      const component = () => createComponent({...allProps, [myProp]:null});
      expect(component).toThrow();
    });
  });

  it('render tags array', () => {
    const tagObject = {
      tags: ['1', '2', '3'],
    };
    const component = createComponent(allProps);
    component.setProps(tagObject);

    tagObject.tags.forEach((tag, id) =>
      expect(
        component
          .find('.tags span')
          .at(id)
          .text()
      ).toEqual(tag)
    );
  });

  it('should throw error without required props', () => {
    const component = () => shallow(<TripSummary />);
    expect(component).toThrow();
  });
});
