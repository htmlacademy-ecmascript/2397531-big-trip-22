import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils.js';
import { calculateDuration } from '../utils.js';
import { DateFormats } from '../const.js';

function createPointTemplate(point, offerList, destinations) {
  const {type, dateFrom, dateTo, basePrice, isFavourite, offers, destination} = point;

  const destinationPoint = destinations.find((dest) => dest.id === destination);
  const offerPoint = offerList.find((currentOffer) => currentOffer.type === type);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatDate(dateFrom, DateFormats.MONTH)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationPoint.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatDate(dateFrom, DateFormats.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatDate(dateTo, DateFormats.TIME)}</time>
          </p>
          <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerPoint.offers.map((offer) => {
      if (offers.includes(offer.id)) {
        return (`<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`);
      }
    }).join('')}
        </ul>
        <button class="event__favorite-btn ${isFavourite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #hundleEditBtnClick = null;
  #hundleFavouriteClick = null;

  constructor({point, offers, destinations, onEditBtnClick, onFavouriteClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#hundleEditBtnClick = onEditBtnClick;
    this.#hundleFavouriteClick = onFavouriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editBtnClickHundler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favouriteClickHundler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #editBtnClickHundler = () => {
    this.#hundleEditBtnClick();
  };

  #favouriteClickHundler = () => {
    this.#hundleFavouriteClick();
  };
}
