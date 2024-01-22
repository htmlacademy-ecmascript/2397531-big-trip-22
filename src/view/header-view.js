import AbstractView from '../framework/view/abstract-view';
import { formatDate } from '../utils';
import { DateFormats } from '../const';

const MAX_DESTINATIONS = 2;

function createHeaderTemplate(totalPrice, route, points) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${formatDate(points[0].dateFrom, DateFormats.ROUTE_MONTH)}&nbsp;&mdash;&nbsp;${formatDate(points[points.length - 1].dateTo, DateFormats.ROUTE_MONTH)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export class HeaderView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createHeaderTemplate(this.#totalPrice(), this.#routeDestinations(), this.#points);
  }

  #totalPrice() {
    return this.#points.reduce((total, point) => total + point.basePrice, 0);
  }

  #routeDestinations() {
    if (this.#destinations.length > MAX_DESTINATIONS) {
      return `${this.#destinations[0].name} - ... - ${this.#destinations[this.#destinations.length - 1].name}`;
    }

    return this.#destinations.map((dest) => dest.name).join(' - ');
  }
}
