import React from 'react';
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Course from "./pages/Course";
import Splash from "./pages/Splash";

function App() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Switch>
        <Route exact path = "/" component={Splash} />
        <Route exact path = "/course" component={Course}/>
      </Switch>
    </div>
  );
}

export default App;
