import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../containers/Pages/Home/Home";
import Products from "../containers/Pages/Products/Products";
import AboutUs from "../containers/Pages/AboutUs/AboutUs";
import Contacts from "../containers/Pages/Contacts/Contacts";
import Feedbacks from "../containers/Pages/Feedbacks/Feedbacks";
import AdminProducts from "../containers/Pages/Admin/Products/AdminProducts";
import UserOrders from "../containers/Pages/Orders/Orders";
import AdminOrders from "../containers/Pages/Admin/Orders/AdminOrders";
import Cart from "../containers/Pages/Cart/Cart";
import Addresses from "../containers/Pages/Addresses/Addresses";
import Workers from "../containers/Pages/Admin/Workers/Workers";
import UserProfile from "../containers/Pages/UserProfile/UserProfile";
const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path={["/products", "/products/:id"]} component={Products} />
      <Route exact path="/about" component={AboutUs} />
      <Route exact path="/orders" component={UserOrders} />
      <Route exact path="/contacts" component={Contacts} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/addresses" component={Addresses} />
      <Route
        exact
        path={["/feedbacks", "/admin/feedbacks"]}
        component={Feedbacks}
      />
      <Route exact path="/admin/products" component={AdminProducts} />
      <Route exact path="/admin/workers" component={Workers} />
      <Route exact path={"/account"} component={UserProfile} />
      <Route
        exact
        path={["/admin/orders", "/courier/orders", "/kitchenWorker/orders"]}
        component={AdminOrders}
      />
    </Switch>
  );
};

export default AppRoutes;
