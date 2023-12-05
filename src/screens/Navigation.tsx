// Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { NavigationContainer } from '@react-navigation/native';
import LockListScreen from './LockListScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: 'Home' }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Auth"
          options={{ title: 'Auth' }}
          component={AuthScreen}
        />
          <Stack.Screen
          name="LockList"
          options={{ title: 'LockList' }}
          component={LockListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
