import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/components/OnBoradingScreen/OnBoardingScreen';

const Navigator = () => {
  return <NavigationContainer>{<OnboardingScreen />}</NavigationContainer>;
};

function App(): JSX.Element {
  return <Navigator />;
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
