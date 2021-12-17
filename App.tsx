import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Navigation from './src/screens/navigation';
import Signup from './src/screens/singup';
import Signin from './src/screens/singin';
import ReportDetails from './src/screens/reportDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Вход"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#0a798d'},
        }}>
        <Stack.Screen name="Регистрация" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="Вход" component={Signin} options={{headerShown: false}}/>
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ReportDetails" component={ReportDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
