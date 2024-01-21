import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
export default class TripBoardPresenter {
  #tripListComponent = new ListView();
  #pointsModel = null;
  #listContainer = null;
  #filterContainer = null;

  constructor(listContainer, filterContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.pointsList = [...this.#pointsModel.points];
    this.offersList = [...this.#pointsModel.offers];
    this.destinationsList = [...this.#pointsModel.destinations];

    render(new FilterView({points: this.pointsList}), this.#filterContainer);

    if (this.pointsList.length === 0) {
      render(new EmptyListView, this.#listContainer);
      return;
    }

    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({destinations: this.destinationsList, offers: this.offersList, pointsContainer: this.#tripListComponent});
    pointPresenter.init(point);
  }

  #renderBoard() {
    render(new SortView(), this.#listContainer);
    render(this.#tripListComponent, this.#listContainer);

    for (let i = 0; i < this.pointsList.length; i++) {
      this.#renderPoint(this.pointsList[i]);
    }
  }

}
