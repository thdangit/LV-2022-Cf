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

const QRScreen = ({navigation}) => {
  const {getIDDoc, idDoc, cart, total, clearCart} = useAppContext();
  console.log('id doc ne', idDoc);
  console.log('total', total);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(total);
  const [qrvalue, setQrvalue] = useState('');
  const handleCreateQR = (quantity, idDoc) => {
    quantity.length > 0
      ? firestore()
          .collection('QRCode')
          .add({
            name: name,
            datetime: new Date().toLocaleString(),
            quantity: quantity,
            id: idDoc,
          })
          .then(() => {
            // console.log('User added!');

            Alert.alert('Tạo qr thành công!');
            setName('');
            setQuantity('');
            clearCart();
          })
          .catch((err) => {
            Alert.alert('Err', err);
          })
      : Alert.alert('Vui lòng nhập số lượng!!');

    setQrvalue(idDoc);
    console.log('id doc trong handle ne', idDoc);
    console.log('soluong trong qr ne', quantity);
  };
  const handleClearQR = (quantity) => {
    setName('');
    setQuantity('');
    clearCart();
    // setQrvalue('');
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>QR</Text>
      </View>
      <View style={styles.container}>
        <QRCode
          // value={[{soluong: quantity}, {id: idDoc}]}
          value={idDoc ? idDoc : 'NaN'}
          size={200}
          color="#F9813A"
          backgroundColor="white"
          logo={{
            url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
          }}
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
          logoBackgroundColor="#7A2B02"
        />
        <Text style={styles.textStyle}> Số lượng: {total} </Text>
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
          value={Number(quantity)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => handleCreateQR(quantity, idDoc)}>
          <Text style={styles.buttonTextStyle}>TẠO QR CODE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => handleClearQR(quantity)}>
          <Text style={styles.buttonTextStyle}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QRScreen;

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
    fontWeight: 'bold',
  },
});
