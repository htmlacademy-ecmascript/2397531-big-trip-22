import AbstractView from '../framework/view/abstract-view.js';
import { FilterTypes } from '../const.js';

function createFilterItem(filterType, isChecked) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${filterType} ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">${filterType}</label>
    </div>`
  );
}

function createFilterTemplate () {
  return (`
  <form class="trip-filters" action="#" method="get">
    ${FilterTypes.map((item, index) => createFilterItem(item, index === 0)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`);
}

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
