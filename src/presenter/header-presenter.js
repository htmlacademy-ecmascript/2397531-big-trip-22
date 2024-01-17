import { render, RenderPosition } from '../framework/render';
import { HeaderView } from '../view/header-view';

export default class HeaderPresenter {
  #container;
  #pointsModel;

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.pointsList = [...this.#pointsModel.points];
    this.destinations = [...this.#pointsModel.destinations];

    render(new HeaderView({points: this.pointsList, destinations: this.#getSelectedDestenations()}), this.#container, RenderPosition.AFTERBEGIN);
  }

  #getSelectedDestenations() {
    const destinationsIds = this.pointsList.map((point) => point.destination);
    return this.destinations.filter((dest) => destinationsIds.includes(dest.id));
  }
}
