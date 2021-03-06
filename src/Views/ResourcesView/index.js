import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph } = Typography;

const data = [
  {
    title: "React ",
    link: "https://reactjs.org/docs/getting-started.html",
  },
  {
    title: "Ant Design Documentations",
    link: "https://ant.design/docs/react/introduce",
  },
  {
    title: "React Route",
    link: "https://reactrouter.com/web/guides/quick-start",
  },
  {
    title: "Axios",
    link: "https://axios-http.com/docs/intro",
  },
  {
    title: "JsonPlaceholder mock API",
    link: "https://jsonplaceholder.typicode.com/guide/",
  },
  {
    title: "Stack Overflow",
    link: "https://stackoverflow.com/",
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
               
              />
            </List.Item>
            <Divider />
          </>
        )}
      />
    </div>
  );
}
