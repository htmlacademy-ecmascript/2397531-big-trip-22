import { render, replace } from '../framework/render';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';

export default class PointPresenter {
  #point = null;
  #destinations = [];
  #offers = [];
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor({destinations, offers, pointsContainer}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsContainer = pointsContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditBtnClick: () => {
        this.#replacePointToEditForm();
        document.addEventListener('keydown', this.#escapeKeydownHundler);
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

    render(this.#pointComponent, this.#pointsContainer.element);
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
