import { getDestinations } from '../mock/destinations.js';
import { generateOffers } from '../mock/offers.js';
import { getRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 4;

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #offers = generateOffers();
  #destinations = getDestinations();

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }
}
