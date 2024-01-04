import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class TripBoardPresenter {
  tripListComponent = new ListView();

  constructor(listContainer, filterContainer, pointsModel) {
    this.pointsModel = pointsModel;
    this.listContainer = listContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    this.pointsList = [...this.pointsModel.getPoints()];
    this.offersList = [...this.pointsModel.getOffers()];

    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.listContainer);
    render(this.tripListComponent, this.listContainer);
    render(new EditPointView({point: this.pointsList[0], offers: this.offersList}), this.tripListComponent.getElement());

    for (let i = 1; i < this.pointsList.length; i++) {
      const offerForCurrentPoint = this.offersList.find((offer) => offer.type === this.pointsList[i].type);
      render(new PointView({point: this.pointsList[i], offer: offerForCurrentPoint}), this.tripListComponent.getElement());
    }
  }
}
