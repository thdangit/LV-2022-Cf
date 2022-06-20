import {useNavigation} from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import {PrimaryButton} from '../components/Button';

import {useAppContext} from './../../contexts/index';
import {db} from '../../config-firebase';
import {doc, setDoc} from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
// import firebase from 'firebase';
import firebase from '@react-native-firebase/app';

function ProfileScreen({navigation}) {
  const {idUser, getUserID, getInForUser, inforUser} = useAppContext();

  const Test = (idUser) => {
    console.log('idUser', idUser);
    console.log('idChamCong', idChamCong);

    // firestore()
    //   .collection('chamcong')
    //   .doc(idChamCong)
    //   .update({
    //     timestop: new Date().toLocaleString(),
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Hồ sơ</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.itemAvt}>
            <Text style={{color: COLORS.grey}}>Họ tên: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>

          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Email: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>

          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Địa chỉ: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>

          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Giới tính: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>

          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Số điện thoại: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>

          <View style={styles.itemCtBT}>
            <Text style={{color: COLORS.grey}}>Xe: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>
          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Lương cơ bản: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>111</Text>
          </View>
          <View style={{height: 300}}>
            <Image
              style={{
                width: '100%',
                resizeMode: 'contain',
                top: -150,
              }}
              source={require('../../assets/onboardimg.png')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#F9813A',
    width: '100%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
    width: '80%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  contentText: {
    fontSize: 16,
    fontWeight: 'thin',
    textAlign: 'left',
    backgroundColor: COLORS.light,
    borderWidth: 0,
    color: '#555',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    padding: 15,
    width: '100%',
  },
  itemCt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 'thin',
    textAlign: 'left',
    backgroundColor: COLORS.light,
    borderWidth: 0,
    color: '#555',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    padding: 15,
    width: '100%',
  },
  itemAvt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 'thin',
    textAlign: 'left',
    backgroundColor: COLORS.light,
    borderWidth: 0,
    color: '#555',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    width: '100%',
  },
  itemCtBT: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 'thin',
    textAlign: 'left',
    backgroundColor: COLORS.light,
    borderWidth: 0,
    color: '#555',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    padding: 15,
    width: '100%',
    marginTop: 15,
  },
});
