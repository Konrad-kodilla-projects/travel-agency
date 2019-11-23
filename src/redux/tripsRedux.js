/* SELECTORS */

export const getAllTrips = ({ trips }) => trips;

export const getFilteredTrips = ({ trips, filters }) => {
  let output = trips;
  const { searchPhrase, tags } = filters;

  // filter by search phrase
  if (searchPhrase) {
    const pattern = new RegExp(searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  const { to, from } = filters.duration;
  output = output.filter(trip => trip.days >= from && trip.days <= to);

  // TODO - filter by tags
  tags.length > 0
    ? (output = output.filter(trip =>
      tags.every(tag => trip.tags.includes(tag))
    ))
    : null;

  // TODO - sort by cost descending (most expensive goes first)
  const toNum = str => Number(str.replace('$', '').replace(',',''));
  output.sort((a, b) => toNum(b.cost) - toNum(a.cost));
  return output;
};

export const getTripById = ({ trips }, tripId) => {
  const filtered = trips.filter(trip => trip.id === tripId);

  // TODO - filter trips by tripId

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : { error: true };
};

export const getTripsForCountry = ({ trips }, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code === countryCode);

  // TODO - filter trips by countryCode

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{ error: true }];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
