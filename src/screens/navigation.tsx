import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomeScreen from './home';
import ReportScreen from './report';
import MobileMap from './map';

import { enableScreens } from 'react-native-screens';
enableScreens();

const Navigation = () => {
  const User = createMaterialBottomTabNavigator();

  return (
    <User.Navigator
      initialRouteName="Home"
      inactiveColor="white"
      activeColor="#000000"
      barStyle={{backgroundColor: '#0a798d'}}
      shifting
      sceneAnimationEnabled={false}
      style={{flex: 1, flexDirection: 'column'}}>
      <User.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <User.Screen
        name="Map"
        component={MobileMap}
        options={{
          tabBarIcon: 'map-marker',
        }}
      />
      <User.Screen
        name="Add"
        component={ReportScreen}
        options={{
          tabBarIcon: 'plus-circle',
        }}
      />
    </User.Navigator>
  );
};

export default Navigation;
