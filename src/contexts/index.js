import React, {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {auth} from '../config-firebase';
import firebase from '@react-native-firebase/app';
import {onAuthStateChanged} from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const CartContext = React.createContext();

export function Context({children}) {
  const [cart, setCart] = useState([]);
  const [idDoc, setIDDoc] = useState('');
  const [idQR, setIdQR] = useState('');
  const [phone, setPhone] = useState('');
  const [arrIdQR, setArrIdQR] = useState([]);

  console.log('idQR ne', idQR);

  // item : {item}
  const addToCart = (item) => {
    const index = cart.findIndex((v) => v.id === item.id);
    /// ko co
    if (index === -1) {
      setCart([...cart, {...item, quantity: 1}]);
    } else {
      let cloneCart = [...cart];
      cloneCart[index].quantity += 1;
      setCart(cloneCart);
    }

    // Alert.alert('Thêm  thành công!');
  };

  // true la tang
  const updateQuantity = (index, isPlus) => {
    let cloneCart = [...cart];
    cloneCart[index].quantity += isPlus ? 1 : -1;
    setCart(cloneCart);
  };

  const clearCart = () => {
    setCart([]);
    // setIdQR(null);
  };
  const clearIDQR = () => {
    setIdQR('No data');
  };

  const handleXoaSP = (idSanPham) => {
    let index = cart.findIndex((item) => {
      return item.id === idSanPham;
    });
    if (index !== -1) {
      let cloneCartList = [...cart];
      cloneCartList.splice(index, 1);
      setCart(cloneCartList);
    }
    // console.log('xóa nè', idSanPham);
  };

  const handleDecreaseIncrease = (idSanPham, value) => {
    let cloneCart = [...cart];
    let index = cloneCart.findIndex((item) => {
      return item.id === idSanPham;
    });

    if (index !== -1) {
      cloneCart[index].quantity += value;
    }

    !cloneCart[index].quantity && cloneCart.splice(index, 1);

    setCart(cloneCart);
  };

  // gettin current user uid
  const GetUserUid = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
      }
    });
  };

  //get id doc bill
  const handleGetIdDoc = () => {
    firestore()
      .collection('Bill')
      .get()
      .then((querySnapshot) => {
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          console.log(
            'Doc ID: ',
            doc.id,
            // documentSnapshot.data(),
          );
          return doc.id;
        });
      });
    // console.log('Bill', Bill);
  };
  // handleGetIdDoc();
  const handleGetIDBill = () => {
    firestore()
      .collection('QRCode')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().id);
        });
      });
  };

  const getIDDoc = (IDDoc) => {
    // console.log(IDDoc);
    return setIDDoc(IDDoc);
  };

  //get id doc qr

  const getIdQR = (idQR) => {
    return setIdQR(idQR);
  };

  const getIDDocQRCode = () => {
    firebase()
      .collection('QRCode')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().id);
          return doc.id;
        });
      });
  };

  // getIDDocQRCode();

  //get id doc qr
  const handleGetIdDocQRCode = () => {
    firestore()
      .collection('QRCode')
      .get()
      .then((querySnapshot) => {
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          // documentSnapshot.data(),
          console.log('doc', doc.data());
        });
      });
    // console.log('Bill', Bill);
    // console.log('arrIdQR', arrIdQR);
  };
  // handleGetIdDocQRCode();

  // tinh so luong
  const qty = cart.map((item) => {
    return item.quantity;
  });
  const total = qty.reduce((a, b) => a + b, 0);
  // console.log('số lượng', total);

  return (
    <CartContext.Provider
      value={{
        cart,
        idDoc,
        addToCart,
        clearCart,
        updateQuantity,
        handleXoaSP,
        handleDecreaseIncrease,
        GetUserUid,
        getIDDoc,
        total,
        handleGetIdDoc,
        handleGetIDBill,
        getIDDocQRCode,
        getIdQR,
        idQR,
        clearIDQR,
        handleGetIdDocQRCode,
        qty,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useAppContext = () => useContext(CartContext);
