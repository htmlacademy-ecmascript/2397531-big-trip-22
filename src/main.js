import { TripBoardPresenter } from './trip-board-presenter';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const contentContainerElement = document.querySelector('.trip-events');

const tripBoardPresenter = new TripBoardPresenter(contentContainerElement, filterContainerElement);

tripBoardPresenter.init();
