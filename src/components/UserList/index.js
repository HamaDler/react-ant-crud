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
  Empty,
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
      isButtonLoading: false,
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
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  componentDidMount() {
    // GETTING LIST OF OUR USERS AS THE COMPONENT MOUNTS
    this.getUsers();
  }

  // MAKE AXIOS GET CALL TO A MOCK API TO GET USERS AND STORE THEM IN STATE
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

  // GET USER POSTS
  getUserPosts(userId) {
    /* We request all posts, we could also filter the posts through query parameter to only get posts for a certain user like this /posts?userId=1  */
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

  // WHEN A USER IS SELECTED
  handleUserSelect(userId) {
    this.getUserPosts(userId);
    this.setState({ selectedUserId: userId });
  }

  // WHEN ADD NEW POST BUTTON IS PRESSED
  handleAddNewCollapse() {
    this.setState({ isAddingNewPost: true });
  }

  // WHEN CANCEL NEW POST BUTTON IS PRESSED
  handleCancelNewPost() {
    this.setState({ isAddingNewPost: false });
  }

  // WHEN ADD NEW POST FORM IS SUBMITTED
  handleAddNewPostSubmit = (event) => {
    this.setState({ isLoading: true });
    this.setState({ isButtonLoading: true });

    const selectedUserId = this.state.selectedUserId;
    axios
      .post(
        `https://jsonplaceholder.typicode.com/users/${selectedUserId}/posts`,
        {
          title: this.state.postTitle,
          body: this.state.postBody,
          userId: selectedUserId,
        }
      )
      .then((res) => {
        console.log(res.data);
        /*  API endpoints normally return the new user posts object with the new added post, but the mock POST API was only returning what was being submitted, no data really changes on the server. So I had to manually recreate the effect as if it's from a real server and the changes were submitted*/
        const newReturnedPost = res.data;
        this.setState({ posts: [newReturnedPost, ...this.state.posts] });
        this.setState({ isAddingNewPost: false });
        this.setState({ isLoading: false });
        this.setState({ isButtonLoading: false });
      });
  };

  // WHEN USER TYPES IN THE TITLE FOR THE NEW POST TO BE ADDED, STORE IT IN THE STATE
  handlePostTitleChange(e) {
    this.setState({ postTitle: e.target.value });
  }
  //  WHEN USER TYPES IN THE BODY FOR THE NEW POST TO BE ADDED, STORE IT IN THE STATE
  handlePostBodyChange(e) {
    this.setState({ postBody: e.target.value });
  }

  //  WHEN USER CLICKS ON DELETE POST BUTTON
  handleDeletePost(postId) {
    this.setState({ isButtonLoading: true });
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => {
        console.log(res.data);
        /* Again, I am recreating the effects of a delete request as if it's from a real server */
        const postIdToBeDeleted = postId;

        const newPostsAfterDeleteRequest = this.state.posts.filter(
          (post) => post.id !== postIdToBeDeleted
        );

        this.setState({ posts: newPostsAfterDeleteRequest });
        this.setState({ isButtonLoading: false });
      });
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
                            <Button
                              danger
                              key="list-loadmore-edit"
                              loading={this.state.isButtonLoading}
                              style={{ width: "100px" }}
                              onClick={() => this.handleDeletePost(post.id)}
                            >
                              {this.state.isButtonLoading ? "" : "Delete"}
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
        {this.state.posts.length === 0 && <Empty />}
      </>
    );
  }
}

export default UserList;
