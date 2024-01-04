import { TYPES_EVENT } from '../const.js';
import { getRandomNumber } from '../utils.js';

const mockOffers = [];
const MAX_OFFERS = 4;

function generateOffer(id) {
  return ({
    id: id,
    title: 'Upgrade offer',
    price: getRandomNumber(100, 500)
  });
}

function generateOffers() {
  for (let i = 0; i < TYPES_EVENT.length; i++) {
    const offer = {};
    offer.type = TYPES_EVENT[i];
    const offers = [];
    for (let j = 1; j <= MAX_OFFERS; j++) {
      offers.push(generateOffer(j));
    }
    offer.offers = offers;
    mockOffers.push(offer);
  }

  return mockOffers;
}

export {generateOffers};
