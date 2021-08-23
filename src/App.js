import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import MainMenu from "./components/MainMenu";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import DescriptionView from "./components/Views/DescriptionView";
import AppView from "./components/Views/AppView";
import ResourcesView from "./components/Views/ResourcesView";

function App() {
  const topics = ["Description", "App", "Resources"];

  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };
  const Menu = (
    <MainMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div className="App">
      <Router>
        <NavBar menu={Menu} />
        <Layout>
          <SideBar menu={Menu} />
          <Layout.Content className="content">
            <Route exact path="/">
              {/* changing the default route to redirect to the first route in the menu */}
              <Redirect to={topics[0]} />
            </Route>
            <Route path="/description" component={DescriptionView} />
            <Route path="/app" component={AppView} />
            <Route path="/resources" component={ResourcesView} />
          </Layout.Content>
        </Layout>
      </Router>
    </div>
  );
}
export default App;
