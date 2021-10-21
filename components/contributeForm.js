import React, { Component } from "react";
import { Form, Button, Input, Message, Label, Icon } from "semantic-ui-react";
import camp from "./../ethereum/campaign";
import web3 from "./../ethereum/web3";
import { Router } from "./../routes";

export default class ContributeForm extends Component {
  state = {
    contribution: "",
    errMessage: "",
    loader: true,
  };
  contribution = (event) => {
    this.setState({ contribution: event.target.value });
  };

  submit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ loader: false, errMessage: "" });
      const acc = await web3.eth.getAccounts();
      const instance = await camp(this.props.address);
      await instance.methods.contribute().send({
        from: acc[0],
        value: this.state.contribution,
      });
      this.setState({ loader: true });
      Router.replaceRoute(`/campaign/${this.props.address}`);
    } catch (err) {
      this.setState({ errMessage: err.message, loader: true });
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.submit} error={!!this.state.errMessage}>
          <Form.Field>
            <Label style={{ marginBottom: "10px" }}>Minimum contribution</Label>
            <Input
              fluid
              labelPosition="right"
              label="wei"
              placeholder="Amount to contribute"
              value={this.state.contribution}
              onChange={this.contribution}
            />
            <Message
              error={true}
              header="OOPSie!"
              content={this.state.errMessage}
            />
          </Form.Field>
          <Button type="submit" primary>
            Submit
          </Button>
        </Form>
        <Message icon hidden={this.state.loader}>
          <Icon name="sync alternate" loading />
          <Message.Content>
            <Message.Header>Your transaction is being processed</Message.Header>
            Please wait...
          </Message.Content>
        </Message>
      </div>
    );
  }
}
