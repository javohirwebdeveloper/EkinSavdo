const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        discount: 0,
      };
    case "ADD_TO_CART":
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "APPLY_DISCOUNT":
      return {
        ...state,
        discount: action.payload,
      };
    case "ADJUST_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.productId
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + action.payload.amount),
              }
            : item
        ),
      };
    default:
      return state;
  }

};

export default cartReducer;
