import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";


const initialState = {
  cartItems: [],
  shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || {},
  paymentMethod: localStorage.getItem("paymentMethod") || "",
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product != action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

// // Safely parse localStorage item, ensuring it's always an array
// const getCartItemsFromStorage = () => {
//   const cartItems = JSON.parse(localStorage.getItem("cartItems"));
//   return Array.isArray(cartItems) ? cartItems : []; // Ensure it's always an array
// };

// const initialState = {
//   cartItems: getCartItemsFromStorage(), // Safely load cart items from localStorage
//   shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || {},
//   paymentMethod: localStorage.getItem("paymentMethod") || "",
// };

// export const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;

//       // Check if the item already exists in the cart
//       const existingItem = state.cartItems.find(
//         (x) => x.product === item.product
//       );

//       if (existingItem) {
//         // If the item exists, update the quantity of the existing item
//         return {
//           ...state,
//           cartItems: state.cartItems.map((x) =>
//             x.product === existingItem.product ? { ...x, qty: item.qty } : x
//           ),
//         };
//       } else {
//         // If the item doesn't exist, add it to the cart
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }

//     case CART_REMOVE_ITEM:
//       // Remove the item based on product id
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((x) => x.product !== action.payload),
//       };

//     case CART_SAVE_SHIPPING_ADDRESS:
//       return {
//         ...state,
//         shippingAddress: action.payload,
//       };

//     case CART_SAVE_PAYMENT_METHOD:
//       return {
//         ...state,
//         paymentMethod: action.payload,
//       };

//     default:
//       return {
//         ...state,
//         cartItems: Array.isArray(state.cartItems) ? state.cartItems : [], // Ensure cartItems is an array after any action
//       };
//   }
// };
