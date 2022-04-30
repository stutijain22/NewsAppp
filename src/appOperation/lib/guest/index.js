import {GUEST_TYPE} from '../../types';

export default (appOperation) => ({
  newsList: (pageNo) =>
    appOperation.get(
      `/top-headlines?country=in&apiKey=a0411bf94dbb47f989769c6f2af720c2&pageNo=${pageNo}`,
      undefined,
      undefined,
      GUEST_TYPE,
    ),
});
