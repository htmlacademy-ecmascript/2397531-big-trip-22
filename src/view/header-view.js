import AbstractView from '../framework/view/abstract-view';

function createHeaderTemplate(totalPrice, route) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
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
    return createHeaderTemplate(this.#totalPrice(), this.#routeDestinations());
  }

  #totalPrice() {
    return this.#points.reduce((total, point) => total + point.basePrice, 0);
  }

  #routeDestinations() {
    if (this.#destinations.length > 2) {
      return `${this.#destinations[0].name} - ... - ${this.#destinations[this.#destinations.length - 1].name}`;
    }

    return this.#destinations.map((dest) => dest.name).join(' - ');
  }
}
