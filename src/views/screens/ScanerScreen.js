import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  TextInput,
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
  const {total, getIdQR} = useAppContext();
  const scanner = useRef(null);

  const [scan, setScan] = useState(false);
  const [resulf, setResulf] = useState(null);
  const [quantityCurrent, setQuantityCurrent] = useState(null);
  const [quantityUpdate, setQuantityUpdate] = useState(null);
  const [slLyKM, setslLyKM] = useState(null);
  const [slLyKMMoi, setslLyKMMoi] = useState(null);
  const [slLyKMCu, setslLyKMMoiCu] = useState(null);
  const [slLyNhan, setSlLyNhan] = useState(null);

  useEffect(() => {
    setResulf(null);
  }, []);

  const onSuccess = (e) => {
    const id = e.data;
    // console.log('id', id);
    getIdQR(id);
    setResulf(id);
    setScan(false);
    firestore()
      .collection('QRCode')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const qtycurrent = doc.data().quantity;
          const lyDaKhuyenMai = doc.data().lyKhuyenMai;

          setslLyKMMoiCu(lyDaKhuyenMai);
          setQuantityCurrent(qtycurrent);
          // console.log('số lượng ly trong qr quét đc', qtycurrent);
          // console.log('số lượng  total', total);

          const qtyUpdate = qtycurrent + total;

          console.log('số lượng tổng cộng update + total', qtyUpdate);

          if (qtyUpdate > 10) {
            var SLLyKM = (qtyUpdate - (qtyUpdate % 10)) / 10;
            setQuantityUpdate(qtyUpdate);
            const slKMMoi = SLLyKM - lyDaKhuyenMai;

            if (SLLyKM === lyDaKhuyenMai) {
              setslLyKMMoi(0);
              setslLyKM(SLLyKM);
            }
            if (SLLyKM > lyDaKhuyenMai) {
              setslLyKMMoi(slKMMoi);
              setslLyKM(SLLyKM);
              Alert.alert('Chúc mừng bạn đã nhận được khuyến mãi!!');
            }
          } else {
            Alert.alert('Chưa đủ số lượng khuyến mãi!!');
            setQuantityUpdate(qtyUpdate);
          }
        }
      });
  };

  const handleUpdateQR = () => {
    // console.log('first');
    total > 0
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
            setQuantityUpdate('');
            setslLyKM(0);
            navigation.navigate('Cart');
          })
          .catch((err) => {
            console.log(err);
            Alert.alert('Lỗi dữ liệu không tồn tại!!');
          })
      : Alert.alert('Chưa có dữ liệu');
  };

  const handleClearQRSn = () => {
    setQuantityCurrent('');
    setQuantityUpdate('');
    setResulf('');
    // slLyKM('');
  };

  const noData = 'chưa quét';
  const noDataKM = 'Chưa có khuyến mãi!!';

  return !scan ? (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quét QR</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>ID QR: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              {' '}
              {resulf ? resulf : 'No data'}
            </Text>
          </View>

          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Đã mua: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              {' '}
              {quantityCurrent}
            </Text>
          </View>

          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey}}>Đang mua: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              {' '}
              {total}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.itemCt}>
            <Text style={{color: COLORS.grey, fontWeight: 'bold'}}>TỔNG: </Text>
            <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
              {' '}
              {quantityUpdate}
            </Text>
          </View>
        </View>
        {resulf ? (
          <View style={styles.content}>
            <View style={styles.itemCt}>
              <Text style={{color: COLORS.grey}}>Đã khuyến mãi: </Text>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                {' '}
                {slLyKMCu}
              </Text>
            </View>
            <View style={styles.itemCt}>
              <Text style={{color: COLORS.grey}}>Khuyến mãi mới: </Text>
              <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>
                {' '}
                {slLyKMMoi}
              </Text>
            </View>

            {slLyKMMoi ? (
              <View style={styles.container_IP}>
                <TextInput
                  placeholder="Nhập ly nhận..."
                  value={slLyNhan}
                  onChangeText={(number) => setSlLyNhan(number)}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            ) : (
              <View style={styles.itemKM}></View>
            )}
          </View>
        ) : (
          <View style={styles.itemKM}></View>
        )}

        {resulf ? (
          <>
            <TouchableOpacity
              style={styles.buttonStyleUD}
              onPress={handleUpdateQR}>
              <Text style={styles.buttonTextStyle}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyleUD}
              onPress={handleClearQRSn}>
              <Text style={styles.buttonTextStyle}>CLEAR</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => setScan(true)}>
              <Text style={styles.buttonTextStyle}>START SCAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyleUD}
              onPress={handleClearQRSn}>
              <Text style={styles.buttonTextStyle}>CLEAR</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quét QR</Text>
      </View>
      <View style={{height: 30}}></View>

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
          style={styles.buttonSC}
          onPress={() => scanner.current.reactivate()}>
          <Text style={styles.buttonTextSC}>SCAN AGAIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSC}
          onPress={() => setScan(false)}>
          <Text style={styles.buttonTextSC}>STOP</Text>
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
    marginBottom: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    marginTop: 385,
    display: 'flex',
    flexDirection: 'row',
    top: 100,
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
  buttonSC: {
    backgroundColor: '#F9813A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 5,
    padding: 5,
    width: '45%',
    marginBottom: 12,
  },
  container_IP: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    paddingBottom: 5,
  },
  input: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
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
  buttonTextSC: {
    paddingVertical: 10,

    fontSize: 14,
    color: '#FFFFFF',
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

  rnCamera: {
    flex: 1,
    width: '100%',
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
  viewBT: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    marginTop: 10,
    width: 100,
  },
});
