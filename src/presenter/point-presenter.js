import { remove, render, replace } from '../framework/render';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';

export default class PointPresenter {
  #point = null;
  #destinations = [];
  #offers = [];
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #onDataChange = null;

  constructor({destinations, offers, pointsContainer, onDataChange}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsContainer = pointsContainer;
    this.#onDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditBtnClick: () => {
        this.#replacePointToEditForm();
        document.addEventListener('keydown', this.#escapeKeydownHundler);
      },
      onFavouriteClick: () => {
        this.#onDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
      }
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: () => {
        this.#replaceEditFormToPoint();
        document.removeEventListener('keydown', this.#escapeKeydownHundler);
      },
      onFormReset: () => {
        this.#replaceEditFormToPoint();
        document.removeEventListener('keydown', this.#escapeKeydownHundler);
      }
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#pointsContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsContainer.contains(prevEditPointComponent.element)) {
      replace(this.#pointEditComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #escapeKeydownHundler(evt) {
    if (evt.key === 'ESCAPE') {
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escapeKeydownHundler);
    }
  }
}
