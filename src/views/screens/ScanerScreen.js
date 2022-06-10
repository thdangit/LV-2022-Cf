import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {useAppContext} from './../../contexts/index';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const ScanerScreen = ({navigation}) => {
  const {idDoc, handleGetIdDoc, handleGetIDBill, cart, handleGetIdDocQRCode} =
    useAppContext();

  const [qtt, setQtt] = useState(0);
  const [idScanner, setIdScanner] = useState('');

  const qty = cart.map((item) => {
    return item.quantity;
  });

  const sl = qty.reduce((a, b) => a + b, 0);

  const handleUpdateQR = (idScanner, qtt) => {
    //get quantity current in QRCode
    idScanner
      ? firestore()
          .collection('QRCode')
          .doc(idScanner)
          .get()
          .then((documentSnapshot) => {
            // console.log('qr exists: ', documentSnapshot.exists);
            if (documentSnapshot.exists) {
              // console.log('qr data quantity: ', documentSnapshot.data().quantity);
              const quantityCR = documentSnapshot.data().quantity;
              setQtt(quantityCR);
            }
          })
      : Alert.alert('Cập nhật thành công!!');

    console.log('số lượng hiện tại', qtt);

    firestore()
      .collection('QRCode')
      .doc(idScanner)
      .update({
        quantity: qtt + sl,
      })
      .then(() => {
        Alert.alert('Cập nhật thành công!!');
        setIdScanner('');
        navigation.navigate('Cart');
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quét QR</Text>
      </View>
      <View style={styles.container}>
        <Text>------------------------------</Text>
      </View>

      <QRCodeScanner
        style={styles.qrcode}
        onRead={({data}) => setIdScanner(data)}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text>ID: {idScanner}</Text>
          <Text>Sản phẩm cập nhật: {qty.reduce((a, b) => a + b, 0)}</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => handleUpdateQR(idScanner, qtt)}>
          <Text style={styles.buttonTextStyle}>CẬP NHẬT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setIdScanner('')}>
          <Text style={styles.buttonTextStyle}>RELOAD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScanerScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  scanner: {
    backgroundColor: 'black',
    width: 270,
    height: 270,
  },
  buttonStyle: {
    backgroundColor: '#F9813A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    padding: 5,
    width: '80%',
    marginBottom: 30,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    color: '#fff',
    height: 40,
    marginTop: 10,
  },
  rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
