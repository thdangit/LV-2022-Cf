import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {collection} from 'firebase/firestore';
import React, {useEffect, useState, useContext} from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {db} from '../config-firebase';
import COLORS from './colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppContext} from '../contexts/index';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Card = ({item}) => {
  const navigation = useNavigation();
  const {cart, addToCart} = useAppContext();

  return (
    <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}>
      <View style={style.card}>
        <View style={{alignItems: 'center', top: 10, left: -7}}>
          <Image
            source={{
              uri: item.hinhanh.url,
            }}
            style={{height: 120, width: 120}}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
            {item.loai}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {Number(item.gia)
              .toFixed(1)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
            VNĐ
          </Text>
          <TouchableOpacity
            style={style.addToCartBtn}
            onPress={() => {
              addToCart(item);
            }}>
            <Icon name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export function Products() {
  const [products, setProduct] = useState([]);

  const renderItem = ({item}) => <Card item={item} />;

  useEffect(() => {
    const getProduct = async () => {
      const data = await firestore().collection('products').get();
      setProduct(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getProduct();
  }, []);
  return <FlatList data={products} numColumns={2} renderItem={renderItem} />;
}
const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// export default Products;
