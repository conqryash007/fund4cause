import React, { Component } from "react";
import Layout from "./../../../components/Layouts";
import style from "./../../../styles.module.css";
import { Link } from "./../../../routes";
import { Form, Message, Icon, Label, Input, Button } from "semantic-ui-react";
import camp from "./../../../ethereum/campaign";
import web3 from "./../../../ethereum/web3";

export default class New extends Component {
  state = {
    errMessage: "",
    loader: true,
    description: "",
    value: "",
    recepient: "",
  };
  static async getInitialProps(props) {
    const address = props.query.addr;
    return {
      address,
    };
  }

  submit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ errMessage: "", loader: false });
      const acc = await web3.eth.getAccounts();
      const { description, value, recepient } = this.state;
      const instance = await camp(this.props.address);
      await instance.methods.createRequest(description, value, recepient).send({
        from: acc[0],
      });
      this.setState({ loader: true });
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
  };

  render() {
    return (
      <div className={style.body}>
        <Layout>
          <Link route={`/campaign/${this.props.address}/requests`}>
            <a>Back</a>
          </Link>
          <h1>Make Request</h1>
          <Form onSubmit={this.submit} error={!!this.state.errMessage}>
            <Form.Field>
              <Label style={{ marginBottom: "10px" }}>Description</Label>
              <Input
                fluid
                labelPosition="right"
                placeholder="Description of request"
                value={this.state.description}
                onChange={(eve) => {
                  this.setState({ description: eve.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <Label style={{ marginBottom: "10px" }}>Value in wei</Label>
              <Input
                fluid
                labelPosition="right"
                placeholder="Value in wei"
                value={this.state.value}
                label="wei"
                onChange={(eve) => {
                  this.setState({ value: eve.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <Label style={{ marginBottom: "10px" }}>Recepient</Label>
              <Input
                fluid
                labelPosition="right"
                placeholder="Recepient"
                value={this.state.recepient}
                label="hex address"
                onChange={(eve) => {
                  this.setState({ recepient: eve.target.value });
                }}
              />
            </Form.Field>
            <Button type="submit" primary>
              Create
            </Button>
            <Message
              error={true}
              header="OOPSie!"
              content={this.state.errMessage}
            />
          </Form>
          <Message icon hidden={this.state.loader}>
            <Icon name="sync alternate" loading />
            <Message.Content>
              <Message.Header>Your request is being processed</Message.Header>
              Please wait...
            </Message.Content>
          </Message>
        </Layout>
      </div>
    );
  }
}
