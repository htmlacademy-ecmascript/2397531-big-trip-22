import AbstractView from '../framework/view/abstract-view';

function createHeaderTemplate(totalPrice, route) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route()}</h1>
        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice()}</span>
      </p>
    </section>`
  );
}

export class HeaderView extends AbstractView {
  #points;
  #destination;

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destination = destinations;
  }

  get template() {
    return createHeaderTemplate(this.#totalPrice, this.#routeDestinations);
  }

  #totalPrice(points) {
    return points.reduce((total, point) => total + point.basePrice, 0);
  }

  #routeDestinations(destinations) {
    if (destinations.length > 2) {
      return `${destinations[0].name} - ... - ${destinations[destinations.length - 1].name}`;
    }

    return destinations.map((dest) => dest.name).join(' - ');
  }
}
