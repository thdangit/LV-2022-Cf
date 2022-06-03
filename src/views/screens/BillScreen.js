import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAppContext} from './../../contexts/index';
import firestore from '@react-native-firebase/firestore';

const BillScreen = ({navigation}) => {
  // const {handleGetIdDoc} = useAppContext();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [qrvalue, setQrvalue] = useState('');
  const handleCreateQR = (name) => {
    name.length > 0
      ? firestore()
          .collection('QRCode')
          .add({
            name: name,
            datetime: new Date().toLocaleString(),
            quantity: quantity,
          })
          .then(() => {
            // console.log('User added!');
            Alert.alert('Tạo qr thành công!');
            setName('');
            setQuantity('');
            setQrvalue(quantity);
          })
          .catch((err) => {
            Alert.alert('Err', err);
          })
      : Alert.alert('Vui lòng nhập tên nhận biết!!');
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>QR</Text>
      </View>
      <View style={styles.container}>
        <QRCode
          value={qrvalue ? qrvalue : 0}
          size={200}
          color="black"
          backgroundColor="white"
          logo={{
            url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
          }}
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
          logoBackgroundColor="yellow"
        />
        <Text style={styles.textStyle}>-------------------------</Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(name) => setName(name)}
          placeholder="Nhập tên nhận biết"
          value={name}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(quantity) => setQuantity(quantity)}
          placeholder="Nhập số lượng"
          value={quantity}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => handleCreateQR(name)}>
          <Text style={styles.buttonTextStyle}>Tạo QR Code</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(inputText)}>
          <Text style={styles.buttonTextStyle}>Tạo QR Code</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default BillScreen;

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
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 8,
    width: '80%',
    marginBottom: 8,
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
  },
});
