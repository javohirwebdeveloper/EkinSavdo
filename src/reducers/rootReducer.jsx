import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import favoritesReducer from "./favoritesReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
