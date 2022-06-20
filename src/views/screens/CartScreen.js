import React, {useState} from 'react';
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

const CartScreen = ({navigation}) => {
  const {
    cart,
    handleXoaSP,
    clearCart,
    handleDecreaseIncrease,
    getIDDoc,
    qty,
    idQR,
  } = useAppContext();
  const [phone, setPhone] = useState('');

  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image
          source={{
            uri: item.hinhanh.url,
          }}
          style={{height: 60, width: 60}}
        />
        <View
          style={{
            height: 100,
            marginLeft: 15,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>{item.loai}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#33c37d'}}>
            {item.gia * item.quantity} VNĐ
          </Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {item.quantity}
          </Text>
          <TouchableOpacity style={style.actionBtn}>
            <Icon
              name="remove"
              size={20}
              color={COLORS.white}
              onPress={() => {
                handleDecreaseIncrease(item.id, -1);
              }}
            />
            <Icon
              name="add"
              size={20}
              color={COLORS.white}
              onPress={() => {
                handleDecreaseIncrease(item.id, 1);
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleXoaSP(item.id);
          }}>
          <Icon
            name="delete"
            size={30}
            style={{marginTop: -50}}
            color="#CC0000"
          />
        </TouchableOpacity>
      </View>
    );
  };

  // tổng bill
  const handleTinhTong = () => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].gia * cart[i].quantity;
    }
    return total;
  };

  const handleAddCartDB = (cart, idQR) => {
    console.log('idQR', idQR);
    if (idQR === 'No data') {
      return idQR === 1;
    }

    // if ((qty.reduce((a, b) => a + b, 0))>=10) {

    // }
    cart.length > 0
      ? firestore()
          .collection('Bill')
          .add({
            phone: phone,
            datetime: new Date().toLocaleString(),
            CartPrice: handleTinhTong(),
            product: firebase.firestore.FieldValue.arrayUnion(...cart),
            quantity: qty.reduce((a, b) => a + b, 0),
            id: idQR,
          })
          .then((doc) => {
            const IDDoc = doc.id;
            // console.log(IDDoc);
            Alert.alert('Thanh toán  thành công!');
            setPhone('');
            getIDDoc(IDDoc);
            clearCart();
            navigation.navigate('HomeScreen');
          })
          .catch((err) => {
            Alert.alert('Err', err);
          })
      : Alert.alert('Chưa có sản phẩm trong giỏ hàng!!');
  };

  const handleScanerQR = (cart) => {
    navigation.navigate('QRScanner');
    // console.log('tìm quantity', cart);
    // console.log(
    //   'số lượng',
    //   qty.reduce((a, b) => a + b, 0),
    // );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Giỏ hàng</Text>
      </View>
      <View style={style.inputContainer}>
        <TextInput
          placeholder="Phone.."
          value={phone}
          onChangeText={(number) => setPhone(number)}
          style={style.input}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={{marginLeft: 12}}
          onPress={() => {
            handleScanerQR(cart);
          }}>
          <Icon name="photo-camera" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={cart}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Số lượng</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {qty.reduce((a, b) => a + b, 0)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Tổng thanh toán
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {handleTinhTong()} VNĐ
                </Text>
              </View>
              <View style={{marginHorizontal: 30}}>
                <PrimaryButton
                  title="THANH TOÁN"
                  onPress={() => {
                    handleAddCartDB(cart, idQR);
                  }}
                />
              </View>
              <View style={{marginHorizontal: 30, marginTop: 20}}>
                <PrimaryButton
                  title="CLEAR"
                  onPress={() => {
                    clearCart();
                  }}
                  style={{opacity: 0.5}}
                />
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 60,
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
    width: '85%',
    marginBottom: 8,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
