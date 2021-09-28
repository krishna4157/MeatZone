export const increment = (value) => {  
  return {
      type: "INCREMENT",
      cartItems : value
    };
  };
  
  export const decrement = (value) => {
    return {
      type: "DECREMENT",
      cartItems : value
    };
  };
  
  export const storeCount = (value) => {
    return {
      type: "ITEMS_IN_CART",
      cartItems : value
    };
  };
  
  export const logIn = () => {
    return {
      type: "LOG_IN",
    };
  };
  
  export const logOut = () => {
    return {
      type: "LOG_OUT",
    };
  };