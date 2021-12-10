import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomeScreen from './home';
import ReportScreen from './report';

const Navigation = () => {
  const User = createMaterialBottomTabNavigator();

  return (
    <User.Navigator
      initialRouteName="Home"
      inactiveColor="white"
      activeColor="#000000"
      barStyle={{backgroundColor: '#0a798d'}}
      shifting
      sceneAnimationEnabled={false}>
      <User.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: 'home',
        }}
      />
      {/* <User.Screen
        name="Map"
        component={MobileMap}
        options={{
          tabBarIcon: 'map-marker',
        }}
      /> */}
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

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigation;
