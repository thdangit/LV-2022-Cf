import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {useAppContext} from './../../contexts/index';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const ScanerScreen = ({navigation}) => {
  const {idDoc, handleGetIdDoc, handleGetIDBill} = useAppContext();
  console.log('scanner', idDoc);

  const handleUpdateQR = () => {
    const arrIDDoc = handleGetIdDoc();
    // return array;
    console.log(arrIDDoc);
    // let index = arrIDDoc.map(item =>{
    //   return item ===
    // })
    const test = handleGetIDBill();
    console.log('test nè', test);
  };
  const onSuccess = (e) => {
    console.log('object');
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
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text>ID: {idDoc}</Text>
          <Text>Số lượng:</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => handleUpdateQR()}>
          <Text style={styles.buttonTextStyle}>UPDATE</Text>
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
    padding: 10,
    width: '80%',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    color: '#fff',
    height: 50,
    marginTop: 30,
  },
  rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
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
