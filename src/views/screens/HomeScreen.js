import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import {Products} from '../../consts/Products';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import {auth} from '../../config-firebase';
import {useNavigation} from '@react-navigation/core';
import {Tooltip} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppContext} from './../../contexts/index';
import {firestore} from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const {inforUser, getInForUser, idUser, getUserID} = useAppContext();

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [toolTip, setToolTip] = useState(true);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('LoginScreen');
      })
      .catch((error) => alert(error.message));
    console.log('first');
  };

  const toggleToolTip = () => {
    setToolTip(!toolTip);
  };

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 24}}>Xin chào,</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 10}}>
              {inforUser.FullName}
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 20, color: COLORS.grey}}>
            Bạn muốn gì ngày hôm nay ?
          </Text>
        </View>

        <TouchableHighlight style={{position: 'relative', marginTop: -2}}>
          <Tooltip
            style={{position: 'absolute', top: -10}}
            backgroundColor={COLORS.light}
            popover={
              <View>
                <Text>Chưa có thông báo!</Text>
              </View>
            }>
            <Icon name="notifications" size={32} color={COLORS.primary} />
          </Tooltip>
        </TouchableHighlight>
        <TouchableOpacity
          style={style.LogoutBtn}
          onPress={() => toggleToolTip()}>
          <Icon name="more-vert" size={25} color={COLORS.primary} />
        </TouchableOpacity>
        {!toolTip && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              position: 'absolute',
              right: 45,
              top: 20,
              zIndex: 110,
              backgroundColor: COLORS.light,
              padding: 10,
            }}>
            <TouchableOpacity
              style={style.ViewTool}
              onPress={() => navigation.navigate('ProfileScreen')}>
              <Text
                style={{
                  color: COLORS.light,
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Hồ sơ
              </Text>
              <Icon name="account-circle" size={18} color={COLORS.light} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleSignOut();
              }}
              style={style.ViewTool}>
              <Text
                style={{
                  color: COLORS.light,
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Đăng xuất
              </Text>
              <Icon name="logout" size={18} color={COLORS.light} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Tìm nhanh..."
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <Products />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // position: 'relative',
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
  ViewTool: {
    width: '100%',
    // height: 25,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  LogoutBtn: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: COLORS.light,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2,
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
export default HomeScreen;
