const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "RESET":
        return (state = 0);
      case "ITEMS_IN_CART":
        return action.cartItems;
      default:
        return state;
    }
  };
  export default counterReducer;