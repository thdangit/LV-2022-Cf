import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import {useAppContext} from '../../contexts/index';
import QRScreen from './../screens/QRScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const {cart} = useAppContext();
  const qty = cart.map((item) => {
    return item.quantity;
  });
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="LocalMall"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="local-mall" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}>
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="qr-code" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Text style={style.qty}>{qty.reduce((a, b) => a + b, 0)}</Text>
              <Icon name="shopping-cart" color={color} size={28} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  qty: {
    fontSize: 12,
    position: 'absolute',
    top: -10,
    right: -2,
    fontWeight: 'bold',
    color: '#F9813A',
  },
});

export default BottomNavigator;
