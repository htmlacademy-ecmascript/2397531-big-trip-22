import dayjs from 'dayjs';
import { FilterTypes } from './const.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

const COUNT_MS_DAY = 86400000;
const COUNT_MS_HOUR = 3600000;

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points,
  [FilterTypes.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(dayjs(point.dateFrom))),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => dayjs().isSameOrAfter(dayjs(point.dateFrom) && dayjs().isSameOrBefore(dayjs(point.dateTo)))),
  [FilterTypes.PAST]: (points) => points.filter((point) => dayjs().isAfter(dayjs(point.dateTo)))
};

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function formatDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
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

function updateItem(itemsList, newItem) {
  return itemsList.map((item) => item.id === newItem.id ? newItem : item);
}

export {getRandomArrayElement, getRandomNumber, formatDate, calculateDuration, filter, updateItem};
