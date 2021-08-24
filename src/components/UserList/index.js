import React, { Component } from "react";
import axios from "axios";
import { Select, Row, Col, List, Button, Divider } from "antd";

const { Option } = Select;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  componentDidMount() {
    // send HTTP request
    // save it to the state
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        this.setState(response.data);
        console.log(response.data);
      });
    console.log("user list component mounted");
  }

  render() {
    return (
      <>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
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
              dataSource={[this.state]}
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
