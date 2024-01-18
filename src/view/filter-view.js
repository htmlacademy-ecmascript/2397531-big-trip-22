import AbstractView from '../framework/view/abstract-view.js';
import { filter } from '../utils.js';

function createFilterItem(filterData, isChecked) {
  const {filterType, pointsCount} = filterData;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filterType}"
              class="trip-filters__filter-input
              visually-hidden" type="radio"
              name="trip-filter"
              value=${filterType}
              ${isChecked ? 'checked' : ''}
              ${pointsCount === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">${filterType}</label>
    </div>`
  );
}

function createFilterTemplate (filterPoints) {
  return (`
  <form class="trip-filters" action="#" method="get">
    ${filterPoints.map((item, index) => createFilterItem(item, index === 0)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`);
}

export default class FilterView extends AbstractView {
  #points;

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createFilterTemplate(this.#getFilterPoints());
  }

  #getFilterPoints() {
    return Object.entries(filter).map(
      ([type, count]) => ({
        filterType: type,
        pointsCount: count(this.#points).length
      }));
  }
}
