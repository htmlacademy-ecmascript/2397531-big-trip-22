import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';
const COUNT_MS_DAY = 86400000;
const COUNT_MS_HOUR = 3600000;

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
  const timeDuration = dayjs(endDate).diff(startDate);
  let timeFormat = 'DD[D] HH[H] mm[M]';
  if (timeDuration < COUNT_MS_DAY) {
    timeFormat = 'HH[H] mm[M]';
  }
  if (timeDuration < COUNT_MS_HOUR) {
    timeFormat = 'mm[M]';
  }
  return dayjs(timeDuration).format(timeFormat);
}

export {getRandomArrayElement, getRandomNumber, formatDate, calculateDuration};
