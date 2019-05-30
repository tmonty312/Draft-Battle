import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import FindALeague from "./components/FindALeague/FindALeague";
import CreateATeam from "./components/FindALeague/CreateATeam";
import CreditCard from "./components/FindALeague/CreditCard";
import Leagues from "./components/FindALeague/Leagues";
import Navebar from "./components/Navbar/Navebar";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Draft Battle</h1>
          <Navebar />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/FindALeague" component={FindALeague} />
          <Route exact path="/CreateATeam" component={CreateATeam} />
          <Route exact path="/CreditCard" component={CreditCard} />
          <Route exact path="/Leagues" component={Leagues} />
        </Switch>
      </div>
    );
  }
}

export default App;
