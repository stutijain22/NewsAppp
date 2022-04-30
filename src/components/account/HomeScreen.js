import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppSafeAreaView,
  Text,
  TEXT_COLOR_BLACK,
  HEADING,
  LABEL,
  Spinner,
} from '../common';
import {ThemeContext} from '../../theme';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {newsList} from '../../actions';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import {NAVIGATION_NEWS_SCREEN} from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';

const HomeScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();
  // Internal State

  const newsListing = useSelector((state) => {
    return state.customerAuth?.newsListing;
  });

  const newListingLoading = useSelector((state) => {
    return state.customerAuth?.newListingLoading;
  });

  const newListingRefresh = useSelector((state) => {
    return state.customerAuth?.newListingRefresh;
  });

  const newListingLoadMore = useSelector((state) => {
    return state.customerAuth?.newListingLoadMore;
  });

  console.log('newsListingnewsListingnewsListing', newsListing);

  useEffect(() => {
    dispatch(newsList());
  }, []);

  const renderItem = ({item, index}) => {
    const spcae =
      index % 2 == 0
        ? {marginEnd: 5, marginBottom: 10, marginStart: 10}
        : {marginStart: 10, marginEnd: 10};
    const {title, urlToImage} = item ?? '';
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NAVIGATION_NEWS_SCREEN, {itemData: item});
        }}
        style={[{flex: 1, alignItems: 'center'}, spcae]}>
        <ImageBackground
          source={{uri: `${urlToImage}`}}
          style={{height: theme.dimens.WINDOW_HEIGHT / 3}}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Text
              style={{
                color: theme.colors.white,
                marginHorizontal: 10,
              }}
              numberOfLines={3}
              type={LABEL}>
              {title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const loadMoreList = () => {
    if (newListingLoadMore > pageNo) {
      dispatch(newsList(1));
      setPageNo(pageNo + 1);
    } else {
      console.log('maximunPage number reached', pageNo);
    }
  };

  return (
    <AppSafeAreaView>
      <View style={styles.toolBar(theme)}>
        <Text style={{marginLeft: 10}} color={TEXT_COLOR_BLACK} type={HEADING}>
          {'Top Heading'}
        </Text>
      </View>
      {newsListing != 0 ? (
        <FlatList
          numColumns={2}
          data={newsListing}
          renderItem={renderItem}
          onEndReachedThreshold={0}
          onEndReached={loadMoreList}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner />
        </View>
      )}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  toolBar: (theme) => ({
    height: 50, //theme.dimens.toolBarHeight,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  }),

  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    // paddingTop: theme.dimens.WINDOW_HEIGHT * 0.1,
    // justifyContent: 'space-between',
    paddingTop: 20,
  }),
});

const mapStateToProps = ({customerAuth}) => {
  return {};
};

HomeScreen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
};

HomeScreen.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps)(HomeScreen);
