import React, {useState, useContext} from 'react';

export const CartContext = React.createContext();

export function Context({children}) {
  const [cart, setCart] = useState([]);

  console.log('cart ne', cart);

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

  return (
    <CartContext.Provider value={{cart, addToCart, clearCart, updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
}

export const useAppContext = () => useContext(CartContext);
