import React from "react";

import { Typography, Space } from "antd";

const { Text, Link } = Typography;

const { Title } = Typography;

export default function index(props) {
  function handleClick() {
    console.log("slaw bra");
    props.history.push("/app");
  }
  return (
    <>
      <Title>App Description</Title>
      <Space direction="vertical">
        <Text>
          This is an example CRUD app created with <Text mark>Ant Design</Text>
        </Text>
        <Text>
          I would normally use functional components with hooks, but I was asked
          to use class components that's why the logic is implimented as such.
        </Text>
        <Text>
          Please also note that this is an example app that was built in such a
          short time. For production apps, I write more robust code and
          breakdown my app into more reusable components.
        </Text>
        <Text>
          For example in a real app, I would dispatch an action to make the API
          calls instead of calling them in a lifecycle method.
        </Text>
        <Text>
          Click{" "}
          <Link onClick={handleClick} type="success">
            Here
          </Link>{" "}
          to go to the CRUD app view.
        </Text>

        <Text>The app has the following functionalities:</Text>
        <ul>
          <li>View list of users</li>
          <li>Select a user</li>
          <li>Send request to server and display posts for that user</li>
          <li>List user posts</li>
          <li>
            If there are no user posts, display an icon to tell there are no
            data available
          </li>
          <li>
            Functionality to add new posts and make a POST request to server
          </li>
          <li>Edit button to edit posts</li>
          <li>
            Delete button that makes a DELETE request to the mock API and
            deletes a post
          </li>
          <li>
            Loading spinner when the data for a user is loading/a post is being
            deleted
          </li>
          <li>Custom theme setup with ant design</li>
          <li>
            For simplicity purposes and due to the project being a small example
            demo, no state management libraries were used and all the logic was
            done in a single component.
          </li>
          <li>
            The POST and DELETE requests don't really make any changes to the
            mock API server. But their effects were recreated it to make it look
            like the data changes on the server'
          </li>
        </ul>
      </Space>
    </>
  );
}
