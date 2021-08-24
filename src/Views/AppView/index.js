import React from "react";
import UserList from "../../components/UserList";
import { Typography } from "antd";
const { Title } = Typography;
export default function index() {
  return (
    <>
      <Title>Our CRUD app view</Title>
      <UserList />
    </>
  );
}
