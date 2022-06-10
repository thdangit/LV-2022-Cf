import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {useAppContext} from './../../contexts/index';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const ScanerScreen = ({navigation}) => {
  const {total} = useAppContext();
  const scanner = useRef(null);
  const [scan, setScan] = useState(false);
  const [resulf, setResulf] = useState(null);
  const [quantityCurrent, setQuantityCurrent] = useState(null);
  const [quantityUpdate, setQuantityUpdate] = useState(null);
  const [slLyKM, setslLyKM] = useState(null);

  const SLKhuyenMai = 10;

  useEffect(() => {
    setResulf(null);
  }, []);

  const onSuccess = (e) => {
    const id = e.data;
    setResulf(id);
    setScan(false);
    firestore()
      .collection('QRCode')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const qtycurrent = doc.data().quantity;
          setQuantityCurrent(qtycurrent);
          console.log('số lượng ly trong qr quét đc', quantityCurrent);
          console.log('số lượng  total', total);

          const qtyUpdate = Number(quantityCurrent) + Number(total);

          console.log('số lượng tổng cộng update + total', qtyUpdate);

          if (qtyUpdate >= 10) {
            Alert.alert('Chúc mừng bạn đã nhận được khuyến mãi!!');
            const SLLyKM = qtyUpdate % 10;
            setQuantityUpdate(qtyUpdate);
            setslLyKM(SLLyKM);
          } else {
            Alert.alert('Chưa đủ số lượng khuyến mãi!!');
            setQuantityUpdate(qtyUpdate);
          }
        }
      });
  };

  const handleUpdateQR = () => {
    resulf
      ? firestore()
          .collection('QRCode')
          .doc(resulf)
          .update({
            quantity: Number(quantityUpdate),
            lyKhuyenMai: Number(slLyKM),
          })
          .then(() => {
            Alert.alert('Cập nhật thành công!!');
            setResulf('');
            setQuantityCurrent('');
            navigation.navigate('Cart');
          })
          .catch((err) => console.log(err))
      : Alert.alert('Chưa có dữ liệu');
  };

  return !scan ? (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quét QR</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            ID: {resulf ? resulf : 'Chưa quét'}
          </Text>
          <Text style={styles.contentText}>
            Số ly hiện có: {quantityCurrent ? quantityCurrent : 'Chưa quét'}
          </Text>
          <Text style={styles.contentText}>Số ly mua: {total}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>
            Số lượng ly khuyến mãi: {slLyKM ? slLyKM : 'Chưa có khuyến mãi'}
          </Text>
          <Text style={styles.contentText}>
            Tổng ly tích được: {quantityUpdate ? quantityUpdate : 'Chưa quét'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setScan(true)}>
          <Text style={styles.buttonTextStyle}>START SCAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyleUD} onPress={handleUpdateQR}>
          <Text style={styles.buttonTextStyle}>UPDATE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quét QR</Text>
      </View>

      <QRCodeScanner
        style={styles.qrcode}
        onRead={onSuccess}
        ref={scanner}
        reactivate={true}
        showMarker={true}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
      <View style={styles.containerSC}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => scanner.current.reactivate()}>
          <Text style={styles.buttonTextStyle}>OK! Got It</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyleST}
          onPress={() => setScan(false)}>
          <Text style={styles.buttonTextStyle}>STOP</Text>
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
    marginBottom: 80,
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  containerSC: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    marginTop: 385,
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
    marginTop: 5,
    padding: 5,
    width: '80%',
    marginBottom: 12,
  },
  buttonStyleUD: {
    backgroundColor: '#F9813A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 5,
    padding: 5,
    width: '80%',
    marginBottom: 12,
  },
  buttonStyleST: {
    backgroundColor: '#F9813A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 5,
    padding: 5,
    width: '80%',
    marginBottom: 25,
  },
  buttonStyleRL: {
    backgroundColor: '#F9813A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: -15,
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
    marginBottom: 10,
    textAlign: 'left',
    width: '80%',
    padding: 5,
    borderRadius: 5,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    width: '80%',
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
  qrcode: {
    height: 20,
  },
});
