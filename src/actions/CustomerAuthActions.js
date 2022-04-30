import {logError} from '../helper/logger';
import {appOperation} from '../appOperation';
import {
  LOAD_MORE_NEWS_LISTING,
  NEWS_LISTING,
  NEWS_LISTING_CLEAR,
  NEWS_LISTING_LOADING,
  NEWS_LISTING_REFRESH,
} from './types';

export const newsList = (pageNo, isRefresh) => async (dispatch) => {
  if (pageNo == 1 && !isRefresh) {
    dispatch({type: NEWS_LISTING_LOADING, payload: true});
  } else if (pageNo == 1 && isRefresh) {
    dispatch({type: NEWS_LISTING_REFRESH, payload: true});
  } else {
    dispatch({type: LOAD_MORE_NEWS_LISTING, payload: true});
  }
  try {
    const response = await appOperation.guest.newsList();
    console.log(
      'reefdnvfgbdfkgdddddddddddddddddddddddddddddddddddjfg',
      response,
    );

    if (response) {
      // if (pageNo == 1 && !isRefresh) {
      //   dispatch({type: NEWS_LISTING_CLEAR, payload: []});
      // } else if (pageNo == 1 && isRefresh) {
      //   dispatch({type: NEWS_LISTING_CLEAR, payload: []});
      // }
      dispatch({type: NEWS_LISTING, payload: response.articles});
      // console.log('repsosnseeeee Articlessss', response.articles);
    } else {
      console.log('errrrrrorrrrrr');
    }
    dispatch({type: NEWS_LISTING_LOADING, payload: false});
    dispatch({type: NEWS_LISTING_REFRESH, payload: false});
    dispatch({type: LOAD_MORE_NEWS_LISTING, payload: false});
  } catch (e) {
    logError(e);
    dispatch({type: NEWS_LISTING_LOADING, payload: false});
    dispatch({type: NEWS_LISTING_REFRESH, payload: false});
    dispatch({type: LOAD_MORE_NEWS_LISTING, payload: false});
  }
};
