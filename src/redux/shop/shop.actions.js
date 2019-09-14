import ShopActionTypes from './shop.types';

export const updateCollections = (collections) => ({
    type: ShopActionTypes.APDATE_COLLECTIONS,
    payload: collections
});