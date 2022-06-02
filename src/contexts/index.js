import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';

export const CartContext = React.createContext();

export function Context({children}) {
  const [cart, setCart] = useState([]);

  console.log('cart ne', {cart});

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

    Alert.alert('Thêm  thành công!');
  };

  // true la tang
  const updateQuantity = (index, isPlus) => {
    let cloneCart = [...cart];
    cloneCart[index].quantity += isPlus ? 1 : -1;
    setCart(cloneCart);
  };

  const clearCart = () => {
    setCart([]);
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
    console.log('xóa nè', idSanPham);
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

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        updateQuantity,
        handleXoaSP,
        handleDecreaseIncrease,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useAppContext = () => useContext(CartContext);
