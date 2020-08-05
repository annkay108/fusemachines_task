import React from 'react';
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Splash from "./pages/Splash";

function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Splash} />
      </Switch>
    </div>
  );
}

export default App;
