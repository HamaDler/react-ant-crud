import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph } = Typography;

const data = [
  {
    title: "Ant Design Documentations",
    link: "https://ant.design/docs/react/introduce",
  },
  {
    title: "Redirect Default Route",
    link: "https://reactrouter.com/web/api/Redirect",
  },
];
export default function index() {
  return (
    <div>
      <Title> Resources View</Title>
      <Paragraph style={{ marginBottom: "4rem" }}>
        These are the resources that were made use of in the development of this
        example app
      </Paragraph>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <>
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
            <Divider />
          </>
        )}
      />
    </div>
  );
}
