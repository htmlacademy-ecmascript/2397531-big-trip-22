import { remove, render, replace } from '../framework/render';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export default class PointPresenter {
  #point = null;
  #destinations = [];
  #offers = [];
  #pointsContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #onDataChange = null;
  #mode = Mode.DEFAULT;
  #hundleModeChange = null;

  constructor({destinations, offers, pointsContainer, onDataChange, onModeChange}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsContainer = pointsContainer;
    this.#onDataChange = onDataChange;
    this.#hundleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditBtnClick: this.#hundleEditBtnClick,
      onFavouriteClick: this.#hundleFavouriteClick
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#hundleFormSubmit,
      onFormReset: this.#hundleFormReset
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  formReset() {
    if (this.#mode === Mode.EDITING) {
      this.#replaceEditFormToPoint();
    }
    this.#pointEditComponent.reset(this.#point);
  }

  #replacePointToEditForm() {
    this.#hundleModeChange();
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escapeKeydownHundler);
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escapeKeydownHundler);
    this.#mode = Mode.DEFAULT;
  }

  #escapeKeydownHundler(evt) {
    if (evt.key === 'ESCAPE') {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escapeKeydownHundler);
    }
  }

  #hundleEditBtnClick = () => {
    this.#replacePointToEditForm();
  };

  #hundleFavouriteClick = () => {
    this.#onDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };

  #hundleFormSubmit = (point) => {
    this.replaceEditFormToPoint();
    this.#onDataChange(point);
  };

  #hundleFormReset = () => {
    this.#pointEditComponent.reset(this.#point);
    this.replaceEditFormToPoint();
  };
}
