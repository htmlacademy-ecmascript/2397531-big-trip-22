import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';

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

    render(new SortView(), this.#listContainer);
    render(this.#tripListComponent, this.#listContainer);

    for (let i = 0; i < this.pointsList.length; i++) {
      this.#renderPoint(this.pointsList[i]);
    }
  }

  #renderPoint(point) {
    const escapeKeydownHundler = (evt) => {
      if (evt.key === 'ESCAPE') {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHundler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      onEditBtnClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escapeKeydownHundler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      onFormSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHundler);
      },
      onFormReset: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHundler);
      }
    });

    function replacePointToEditForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#tripListComponent.element);
  }

}
