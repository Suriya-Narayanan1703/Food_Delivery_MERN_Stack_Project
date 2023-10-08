import "./App.css";
import Header from "./components/Layout/Header.js";
import Home from "./components/Home";
import Footer from "./components/Layout/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./components/cart/Cart";
import Delivery from "./components/cart/Delivery";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/user/Proflie";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgetPassword from "./components/user/ForgetPassword";
import NewPassword from "./components/user/NewPassword";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/eats/stores/:id/menus" element={<Menu />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/delivery" element={<Delivery />} exact />

            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Register />} />
            <Route path="/users/me" element={<Profile />} />
            <Route path="/users/me/update" element={<UpdateProfile />} exact />
            <Route path="/users/forgetPassword" element={<ForgetPassword />} />
            <Route
              path="/users/resetPassword/:token"
              element={<NewPassword />}
              exact
            />
            <Route path="/confirm" element={<ConfirmOrder />} />

            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
