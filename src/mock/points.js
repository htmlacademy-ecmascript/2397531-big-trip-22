import { getRandomDestination } from './destinations.js';
import { getRandomArrayElement } from '../utils.js';
import { TYPES_EVENT } from '../const.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2023-12-10T12:00:00.845Z',
    dateTo: '2023-12-15T12:00:00.845Z',
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 2,
    basePrice: 1500,
    dateFrom: '2023-12-16T12:00:00.845Z',
    dateTo: '2023-12-17T12:00:00.845Z',
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1,2],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 3,
    basePrice: 3000,
    dateFrom: '2023-12-18T12:00:00.845Z',
    dateTo: '2024-01-05T12:00:00.845Z',
    destination: getRandomDestination(),
    isFavorite: true,
    offers: [3],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 4,
    basePrice: 900,
    dateFrom: '2024-01-05T12:00:00.845Z',
    dateTo: '2024-01-20T12:00:00.845Z',
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [2],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 5,
    basePrice: 5000,
    dateFrom: '2024-01-21T12:00:00.845Z',
    dateTo: '2024-10-10T12:00:00.845Z',
    destination: getRandomDestination(),
    isFavorite: true,
    offers: [1,3],
    type: getRandomArrayElement(TYPES_EVENT)
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint, mockPoints};
