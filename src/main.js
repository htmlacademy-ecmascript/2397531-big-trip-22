import TripBoardPresenter from './presenter/trip-board-presenter.js';
import PointsModel from './model/points-model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const contentContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripBoardPresenter = new TripBoardPresenter(contentContainerElement, filterContainerElement, pointsModel);

tripBoardPresenter.init();
