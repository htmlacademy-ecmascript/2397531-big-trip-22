const TYPES_EVENT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DateFormats = {
  MONTH: 'MMM D',
  TIME: 'HH:mm',
  FULL_DATE: 'd/m/y H:i',
  ROUTE_MONTH: 'D MMM'
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export {TYPES_EVENT, DateFormats, FilterTypes, SortType};
