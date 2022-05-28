import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import {Context} from './src/contexts/index';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Context>
      <NavigationContainer>
        {/* <StatusBar hidden={true} /> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
};

export default App;
