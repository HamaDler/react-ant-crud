import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import MainMenu from "./components/MainMenu";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import AppDescription from "./components/AppDescription";
function App() {
  const topics = ["Description", "App", "Resources"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
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
            <h2>{topics[contentIndex]}</h2>
            <Route path="/description" component={AppDescription} />
          </Layout.Content>
        </Layout>
      </Router>
    </div>
  );
}
export default App;
