import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortPoints } from '../utils.js';
import { SortType } from '../const.js';
export default class TripBoardPresenter {
  #tripListComponent = new ListView();
  #pointsModel = null;
  #listContainer = null;
  #filterContainer = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

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

    render(new SortView({onTripSortClick: this.#hundleTripSortClick}), this.#listContainer);
    this.#renderBoard();
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      destinations: this.destinationsList,
      offers: this.offersList,
      pointsContainer: this.#tripListComponent.element,
      onDataChange: this.#hundleUpdatePoint,
      onModeChange: this.#hundleModeChange
    });

    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point);
  }

  #hundleUpdatePoint = (updatePoint) => {
    this.pointsList = updateItem(this.pointsList, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #renderBoard() {
    render(this.#tripListComponent, this.#listContainer);
    sortPoints[this.#currentSortType](this.pointsList);

    for (let i = 0; i < this.pointsList.length; i++) {
      this.#renderPoint(this.pointsList[i]);
    }
  }

  #removePoints() {
    this.#pointPresenters.forEach((point) => point.destroy());
  }

  #hundleTripSortClick = (evt) => {
    if (evt.target.closest('input')) {
      if (this.#currentSortType === evt.target.dataset.sortType) {
        return;
      }

      this.#currentSortType = evt.target.dataset.sortType;
      this.#removePoints();
      this.#renderBoard();
    }
  };

  #hundleModeChange = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.formReset());
  };

}
