import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../../constants';
import Homescreen from '../screens/HomeScreen/Homescreen';

interface ScreenProps {
  name: string;
  component: any;
}

export default function Navigation() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name={'Home'} component={Homescreen} />;
        <Stack.Screen name={'Home'} component={Homescreen} />;
        <Stack.Screen name={'Home'} component={Homescreen} />; 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
