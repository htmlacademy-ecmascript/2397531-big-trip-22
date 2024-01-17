import TripBoardPresenter from './presenter/trip-board-presenter.js';
import PointsModel from './model/points-model.js';
import HeaderPresenter from './presenter/header-presenter.js';

const headerContainerElement = document.querySelector('.trip-main');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const contentContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const headerPresenter = new HeaderPresenter(headerContainerElement, pointsModel);
const tripBoardPresenter = new TripBoardPresenter(contentContainerElement, filterContainerElement, pointsModel);

headerPresenter.init();
tripBoardPresenter.init();
