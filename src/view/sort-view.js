import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItem(sortType) {
  return (`<div class="trip-sort__item  trip-sort__item--${sortType}">
            <input id="sort-${sortType}" class="trip-sort__input visually-hidden"
                                 data-sort-type="${sortType}"
                                 type="radio" name="trip-sort"
                                 value="sort-${sortType}"
                                 ${sortType === SortType.DAY ? 'checked' : ''}
                                 ${sortType === SortType.EVENT || sortType === SortType.OFFERS ? 'disabled' : ''}>
            <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
          </div>`);
}

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((type) => createSortItem(type)).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #hundleSortClick = null;

  constructor({onTripSortClick}) {
    super();
    this.#hundleSortClick = onTripSortClick;

    this.element.addEventListener('click', this.#tripSortClickHundler);
  }

  get template() {
    return createSortTemplate();
  }

  #tripSortClickHundler = (evt) => {
    this.#hundleSortClick(evt);
  };
}
