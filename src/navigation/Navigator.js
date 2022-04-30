import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as routes from './routes';
import HomeScreen from '../components/account/HomeScreen';
import NewsScreen from '../components/account/NewsScreen';

const AccountSwitch = createSwitchNavigator({
  [routes.NAVIGATION_HOME_SCREEN]: HomeScreen,
  [routes.NAVIGATION_NEWS_SCREEN]: NewsScreen,
});

export const Navigator = createAppContainer(AccountSwitch);
