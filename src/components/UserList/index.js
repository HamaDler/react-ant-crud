import React, { Component } from "react";
import axios from "axios";
import {
  Select,
  Row,
  Col,
  List,
  Button,
  Divider,
  Spin,
  Input,
  Collapse,
  Typography,
  Space,
  Form,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

function callback(key) {
  console.log(key);
}
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      isAddingNewPost: false,
      posts: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.axiosCall = this.axiosCall.bind(this);
    this.handleAddNewPost = this.handleAddNewPost.bind(this);
  }

  // Function that takes in User ID, makes an api call to get posts for that user and updates the state
  axiosCall(userId) {
    this.setState({ isLoading: true });
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then((response) => {
        this.setState({
          isLoading: false,
          posts: response.data,
        });
        console.log(response.data);
      });
  }

  componentDidMount() {
    // Populating state with posts from user of ID 1 on component mount
    // this.axiosCall(1);
    console.log("Posts for the first user list have been loaded");
  }

  handleChange(userId) {
    console.log(userId);
    this.axiosCall(userId);
  }

  handleAddNewPost() {
    console.log("add new post button clicked");
    this.setState({ isAddingNewPost: true });
  }

  render() {
    return (
      <>
        <Select
          defaultValue="Pick User"
          style={{ width: 140, marginBottom: "4rem" }}
          onChange={this.handleChange}
        >
          <Option value="1">User with ID 1</Option>
          <Option value="2">User with ID 2</Option>
          <Option value="3">User with ID 3</Option>
        </Select>

        {
          /*  ONLY RENDER POSTS LIST IF USER POSTS HAVE BEEN FETCHED */
          this.state.posts.length !== 0 && (
            <Row>
              <Col span={24}>
                {this.state.isLoading ? (
                  <Spin tip="Loading..." size="large" style={{ height: "50%" }}>
                    <div
                      style={{ background: "#f0f2f5", height: 500, margin: 24 }}
                    ></div>
                  </Spin>
                ) : (
                  <List
                    itemLayout="horizontal"
                    dataSource={[this.state.posts]}
                    renderItem={(post) => (
                      <>
                        <Title level={4}>User posts</Title>
                        <List.Item
                          actions={[
                            <Button type="primary" key="list-loadmore-edit">
                              Edit
                            </Button>,
                            <Button danger key="list-loadmore-edit">
                              Delete
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <a href="https://ant.design">{post.title}</a>
                            }
                            description={post.body}
                          />
                        </List.Item>
                        <Divider></Divider>

                        <Button
                          type="dashed"
                          icon={<PlusCircleOutlined />}
                          style={{ marginBottom: "1rem" }}
                          onClick={this.handleAddNewPost}
                        >
                          Add a new post
                        </Button>
                        {this.state.isAddingNewPost && (
                          <Form name="basic" initialValues={{ remember: true }}>
                            <Form.Item wrapperCol={{ span: 16 }}>
                              <Input placeholder="Post Title" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 16 }}>
                              <TextArea rows={4} placeholder="Post Body" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 16 }}>
                              <Button type="dashed" htmlType="submit">
                                Add
                              </Button>
                              <Button
                                type="dashed"
                                htmlType="submit"
                                danger
                                style={{ marginLeft: "1rem" }}
                              >
                                Cancel
                              </Button>
                            </Form.Item>
                          </Form>
                        )}
                      </>
                    )}
                  />
                )}
              </Col>
            </Row>
          )
        }
      </>
    );
  }
}

export default UserList;
