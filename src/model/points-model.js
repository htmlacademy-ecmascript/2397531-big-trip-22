import { generateOffers } from '../mock/offers.js';
import { getRandomPoint } from '../mock/points.js';

const POINTS_COUNT = 4;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  offers = generateOffers();

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }
}
