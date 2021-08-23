import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
const MainMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const styledTopics = [];
  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.Item key={index} onClick={changeSelectedKey}>
        <Link to={`/${topic.toLowerCase()}`}>{topic}</Link>
      </Menu.Item>
    )
  );

  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
};
export default MainMenu;
