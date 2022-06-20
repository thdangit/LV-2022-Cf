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
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Hồ sơ</Text>
      </View>
      <View style={style.content}>
        <TouchableOpacity
          onPress={() => {
            // Test(idUser);
          }}
          style={style.button}>
          <Text style={style.buttonText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <View>
          <Text>{inforUser.FullName}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  content: {
    width: '100%',
    backgroundColor: COLORS.grey,
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
});
