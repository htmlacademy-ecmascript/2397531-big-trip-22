import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import AddPointView from '../view/add-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

const POINT_COUNT = 3;

export class TripBoardPresenter {
  tripListComponent = new ListView();

  constructor(listContainer, filterContainer) {
    this.listContainer = listContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.listContainer);
    render(this.tripListComponent, this.listContainer);
    render(new AddPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new PointView(), this.tripListComponent.getElement());
    }
  }
}
