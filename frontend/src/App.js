import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NavBar from './components/NavBar/NavBar';
import {Home} from "./containers/Pages/Home/Home"
import Products from "./containers/Pages/Products/Products"
import AboutUs from "./containers/Pages/AboutUs/AboutUs"
import Contacts from "./containers/Pages/Contacts/Contacts"
import Footer from './components/Footer/Footer';
import Feedbacks from './containers/Pages/Feedbacks/Feedbacks';
import { Salads, Soups, Sushies, SushiesSets, Drinks, Product } from './components/Pages/Products/ProductData/ProductData';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={()=><Products data={Product}/>} />
            <Route exact path="/products/sushies" component={()=><Products data={Sushies}/>} />
            <Route exact path="/products/sushies-sets" component={()=><Products data={SushiesSets}/>} />
            <Route exact path="/products/salads" component={()=><Products data={Salads}/>} />
            <Route exact path="/products/soups" component={()=><Products data={Soups}/>} />
            <Route exact path="/products/drinks" component={()=><Products data={Drinks}/>} />
            <Route exact path="/about"component={AboutUs}/>
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/feedbacks"component={Feedbacks}/>
          </Switch>
          <Footer/>
        </Router>
    </div>
  );
}

export default App;
