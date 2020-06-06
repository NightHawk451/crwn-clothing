import ShopActionTypes from './shop.types'

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils.js';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-f8b64/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections));

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap))
    }).catch(error => dispatch)

    // this.unsubscribeFromSnapShot = collectionRef.onSnapShot(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }
}