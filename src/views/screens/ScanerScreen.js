import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const ScanerScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quét QR</Text>
      </View>
      <View style={styles.container}>
        <Text>------------------------------</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.scanner}></Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text>ID:</Text>
          <Text>Số lượng:</Text>
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
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
});
