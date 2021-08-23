import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const data = [
  {
    title: "Ant Design Documentations",
    link: "https://reactjs.org/docs/getting-started.html",
  },
  {
    title: "Ant Design Title 2",
    link: "",
  },
  {
    title: "Ant Design Title 3",
    link: "",
  },
  {
    title: "Ant Design Title 4",
    link: "",
  },
];
export default function index() {
  return (
    <div>
      <Title> Resources View</Title>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                href={item.link}
                key="list-loadmore-edit"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<a href={item.link}>{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
