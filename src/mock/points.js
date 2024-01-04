import { getRandomDestination } from './destinations.js';
import { getRandomArrayElement } from '../utils.js';
import { TYPES_EVENT } from '../const.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: new Date('2023-12-10'),
    dateTo: new Date('2023-12-15'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 2,
    basePrice: 1500,
    dateFrom: new Date('2023-12-16'),
    dateTo: new Date('2023-12-17'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [1,2],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 3,
    basePrice: 3000,
    dateFrom: new Date('2023-12-18'),
    dateTo: new Date('2024-01-05'),
    destination: getRandomDestination(),
    isFavorite: true,
    offers: [3],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 4,
    basePrice: 900,
    dateFrom: new Date('2024-01-05'),
    dateTo: new Date('2024-01-20'),
    destination: getRandomDestination(),
    isFavorite: false,
    offers: [2],
    type: getRandomArrayElement(TYPES_EVENT)
  },
  {
    id: 5,
    basePrice: 5000,
    dateFrom: new Date('2024-01-21'),
    dateTo: new Date('2024-06-01'),
    destination: getRandomDestination(),
    isFavorite: true,
    offers: [1,3],
    type: getRandomArrayElement(TYPES_EVENT)
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
