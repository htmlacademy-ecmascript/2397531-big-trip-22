import { getRandomArrayElement, getRandomNumber } from '../utils.js';

const mockDestinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Description Chamonix'
      }
    ]
  },
  {
    id: 2,
    description: 'London, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'London',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Description London'
      }
    ]
  },
  {
    id: 3,
    description: 'Madrid, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Madrid',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Description Madrid'
      }
    ]
  },
  {
    id: 4,
    description: 'Manchester, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Manchester',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Description Manchester'
      }
    ]
  },
  {
    id: 5,
    description: 'Barcelona, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Barcelona',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Description Barcelona'
      }
    ]
  }
];

function getRandomDestination() {
  return getRandomArrayElement(mockDestinations);
}

export {getRandomDestination};
