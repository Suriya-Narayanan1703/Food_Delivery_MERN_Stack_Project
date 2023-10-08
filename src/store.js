import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";

import thunk from "redux-thunk";
import { restaurantReducer } from "./reducers/restaurantReducer";
import { menuReducer } from "./reducers/menuReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  authReducer,
  forgetPasswordReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  restaurants: restaurantReducer,
  menus: menuReducer,
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgetPasswordReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    deliveryInfo: localStorage.getItem("deliverInfo")
      ? JSON.parse(localStorage.getItem("deliveryInfo"))
      : [],
  },
};

const composeenhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeenhancers(applyMiddleware(...middleware))
);

export default store;
