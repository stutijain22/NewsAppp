import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppSafeAreaView,
  Text,
  TEXT_COLOR_BLACK,
  HEADING,
  LABEL,
  SEMI_BOLD,
} from '../common';
import {ThemeContext} from '../../theme';
import {NAVIGATION_HOME_SCREEN} from '../../navigation/routes';

const NewsScreen = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  // Internal State
  const item = navigation.state.params.itemData;
  const {title, description, urlToImage} = item ?? '';

  return (
    <AppSafeAreaView style={{flex: 1}}>
      <View style={styles.toolBar(theme)}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: 20, height: 20, alignSelf: 'center'}}
          onPress={() => navigation.navigate(NAVIGATION_HOME_SCREEN)}>
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: theme.colors.black,
            }}
            source={require('./../../../assets/img/ic_arrow_back.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Text
          style={{marginLeft: 10, alignSelf: 'center'}}
          color={TEXT_COLOR_BLACK}
          type={HEADING}>
          {'News Details'}
        </Text>
      </View>
      <Image
        style={{
          width: '100%',
          height: 200,
        }}
        source={{uri: `${urlToImage}`}}
        resizeMode={'cover'}
      />
      <Text
        style={{marginHorizontal: 10}}
        weight={SEMI_BOLD}
        color={TEXT_COLOR_BLACK}
        type={HEADING}>
        {title}
      </Text>

      <Text
        style={{marginHorizontal: 10, marginVertical: 10}}
        color={TEXT_COLOR_BLACK}
        type={LABEL}>
        {description}
      </Text>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  toolBar: (theme) => ({
    height: 50, //theme.dimens.toolBarHeight,
    backgroundColor: 'green',
    paddingHorizontal: 10,
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

NewsScreen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
};

NewsScreen.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, {})(NewsScreen);
