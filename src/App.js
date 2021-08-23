import React, { useState } from "react";
import { Layout } from "antd";
import MainMenu from "./components/MainMenu";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
function App() {
  const topics = ["App Description", "App", "Resources"];
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
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {topics[contentIndex]}
        </Layout.Content>
      </Layout>
    </div>
  );
}
export default App;
