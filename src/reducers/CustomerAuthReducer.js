import {
  APP_PASSWORD_RESET_LOADING,
  LOAD_MORE_NEWS_LISTING,
  NEWS_LISTING,
  NEWS_LISTING_CLEAR,
  NEWS_LISTING_LOADING,
  NEWS_LISTING_REFRESH,
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  token: null,
  newsListing: [],
  newListingLoading: false,
  newListingRefresh: false,
  newListingLoadMore: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWS_LISTING:
      const totalPagesNewsList =
        action.payload && action.payload.totalResults
          ? action.payload.totalResults
          : 1;
      const newPagesNews =
        action.payload && action.payload ? action.payload : [];
      const pastPagesNews =
        state.newsListing.length != 0 ? state.newsListing : [];

      console.log('totalPagesNewsListtotalPagesNewsList', totalPagesNewsList);
      console.log('newPagesNewsnewPagesNewsnewPagesNews', newPagesNews);
      console.log('pastPagesNewspastPagesNewspastPagesNews', pastPagesNews);
      return {
        ...state,
        newsListing: [...newPagesNews, ...pastPagesNews],
        totalPagesNewsList,
      };

    case NEWS_LISTING_CLEAR:
      state.newsListing = [];
      return {...state};

    case NEWS_LISTING_LOADING:
      return {...state, newListingLoading: action.payload};

    case NEWS_LISTING_REFRESH:
      return {...state, newListingRefresh: action.payload};

    case LOAD_MORE_NEWS_LISTING:
      return {...state, newListingLoadMore: action.payload};

    default:
      return state;
  }
};
