// selectors
export const getOrder = ({order}) => order;
export const getOrderOptions = ({order}) => order.options;
export const getTripByID = ({trips}, id) => trips.filter(trip => trip.id === id)[0];

// action name creator
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const SET_OPTION = createActionName('SET_OPTION');

// action creators
export const setOrderOption = payload => ({ payload, type: SET_OPTION });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SET_OPTION:
      return {
        ...statePart,
        options: {
          ...statePart.options,
          ...action.payload,
        },
      };
    default:
      return statePart;
  }
}
