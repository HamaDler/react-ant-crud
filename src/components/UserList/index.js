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
  Typography,
  Form,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      isAddingNewPost: false,
      users: [],
      posts: [],
      selectedUserId: 1,
      postTitle: "",
      postBody: "",
    };

    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.getUserPosts = this.getUserPosts.bind(this);
    this.handleAddNewCollapse = this.handleAddNewCollapse.bind(this);
    this.handleCancelNewPost = this.handleCancelNewPost.bind(this);
    this.handleAddNewPostSubmit = this.handleAddNewPostSubmit.bind(this);
    this.handlePostTitleChange = this.handlePostTitleChange.bind(this);
    this.handlePostBodyChange = this.handlePostBodyChange.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/`)
      .then((response) => {
        this.setState({
          isLoading: false,
          users: response.data,
        });
        console.log(response.data);
      });
  }

  // Function that takes in User ID, makes an api call to get posts for that user and updates the state
  getUserPosts(userId) {
    this.setState({ isLoading: true });
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response) => {
        this.setState({
          isLoading: false,
          posts: response.data,
        });
        console.log(response.data);
      });
  }

  handleUserSelect(userId) {
    this.getUserPosts(userId);
    this.setState({ selectedUserId: userId });
  }

  handleAddNewCollapse() {
    this.setState({ isAddingNewPost: true });
  }
  handleCancelNewPost() {
    this.setState({ isAddingNewPost: false });
  }

  handleAddNewPostSubmit = (event) => {
    this.setState({ isLoading: true });
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        title: this.state.postTitle,
        body: this.state.postBody,
        userId: this.state.selectedUserId,
      })
      .then((res) => {
        console.log(res.data);

        const newReturnedPost = res.data;
        this.setState({ posts: [newReturnedPost, ...this.state.posts] });
        this.setState({ isAddingNewPost: false });
        this.setState({ isLoading: false });
      });
  };

  handlePostTitleChange(e) {
    this.setState({ postTitle: e.target.value });
  }
  handlePostBodyChange(e) {
    this.setState({ postBody: e.target.value });
  }

  render() {
    const users = this.state.users;
    return (
      <>
        <Select
          defaultValue="Pick User"
          style={{ width: 140, marginBottom: "4rem" }}
          onChange={this.handleUserSelect}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <Title level={4} style={{ marginBottom: "2rem" }}>
          User posts
        </Title>

        {
          /*  ONLY RENDER POSTS LIST IF USER POSTS HAVE BEEN FETCHED */
          this.state.posts.length !== 0 && (
            <Row>
              <Col span={24}>
                <Button
                  type="dashed"
                  icon={<PlusCircleOutlined />}
                  style={{ marginBottom: "1rem" }}
                  onClick={this.handleAddNewCollapse}
                >
                  Add a new post
                </Button>
                {this.state.isAddingNewPost && (
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.handleAddNewPostSubmit}
                  >
                    <Form.Item wrapperCol={{ span: 16 }}>
                      <Input
                        placeholder="Post Title"
                        onChange={this.handlePostTitleChange}
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }}>
                      <TextArea
                        rows={4}
                        placeholder="Post Body"
                        onChange={this.handlePostBodyChange}
                      />
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
                        onClick={this.handleCancelNewPost}
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                )}
                {this.state.isLoading ? (
                  <Spin tip="Loading..." size="large" style={{ height: "50%" }}>
                    <div
                      style={{ background: "#f0f2f5", height: 500, margin: 24 }}
                    ></div>
                  </Spin>
                ) : (
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.posts}
                    renderItem={(post) => (
                      <>
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
