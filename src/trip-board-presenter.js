import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import ListView from './view/list-view';
import AddPointView from './view/add-point-view';
import EditPointView from './view/edit-point-view';
import PointView from './view/point-view';
import { render } from './render';

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
