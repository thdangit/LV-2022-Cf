import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import {PrimaryButton} from '../components/Button';
import {useAppContext} from './../../contexts/index';

const OnBoardScreen = ({navigation}) => {
  const {GetUserUid} = useAppContext();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgcf, marginTop: 0}}>
      <View style={{height: 400}}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            top: -50,
          }}
          source={require('../../assets/onboardimg.png')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#fff',
            }}>
            Chuỗi cửa hàng Lamon Cafe
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: COLORS.grey,
            }}>
            Chúc bạn một ngày làm việc tốt lành!
          </Text>
        </View>
        {/* <View style={style.indicatorContainer}></View> */}
        <PrimaryButton
          style={{marginTop: -20}}
          onPress={() => {
            // GetUserUid();
            navigation.navigate('Home');
          }}
          title="Start"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  // indicatorContainer: {
  //   height: 50,
  //   flex: 1,
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
