import React from 'react';
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import PathBar from "./components/PathBar";

import Files from "./pages/Files";
import Course from "./pages/Course";
import Splash from "./pages/Splash";

function App() {
  return (
    <div>
      <Navbar/>
      <PathBar/>
      <Switch>
        <Route exact path = "/" component={Splash} />
        <Route exact path = "/course" component={Course}/>
        <Route exact path = "/course/:id" component={Files}/>
      </Switch>
    </div>
  );
}

export default App;
