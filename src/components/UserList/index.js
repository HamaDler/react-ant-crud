import React, { Component } from "react";
import axios from "axios";
import { Select, Row, Col, List, Button, Divider } from "antd";

const { Option } = Select;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.axiosCall = this.axiosCall.bind(this);
  }

  axiosCall(userId) {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${userId}`)
      .then((response) => {
        this.setState({
          isLoaded: true,
          posts: response.data,
        });
        console.log(response.data);
      });
  }

  componentDidMount() {
    // send HTTP request
    // save it to the state
    this.axiosCall(1);
    console.log("user list component mounted");
  }

  handleChange(userId) {
    console.log(userId);
    this.axiosCall(userId);
  }

  render() {
    return (
      <>
        <Select
          defaultValue="Pick User"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="1">User with ID 1</Option>
          <Option value="2">User with ID 2</Option>
          <Option value="3">User with ID 3</Option>
        </Select>

        {/* 
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}

        <Row>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              dataSource={[this.state.posts]}
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
                      title={<a href="https://ant.design">{post.title}</a>}
                      description={post.body}
                    />
                  </List.Item>
                  <Divider></Divider>
                </>
              )}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default UserList;
