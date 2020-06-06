

import ShopActionTypes from './shop.types'
import ShopPage from '../../pages/shop/shop.component';

const INITIAL_STATE = {
  collections: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      }
    default:
      return state;
  }
};

export default shopReducer;