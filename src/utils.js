import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function formatDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function calculateDuration(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'd');
}

export {getRandomArrayElement, getRandomNumber, formatDate, calculateDuration};
