import React, { Component } from "react";
import Layout from "./../../components/Layouts";
import { Form, Button, Input, Message, Label, Icon } from "semantic-ui-react";
import compileFactory from "./../../ethereum/build/CampaignFactory.json";
import getweb3 from "./../../ethereum/getweb3";
import style from "./../../styles.module.css";
import { Router } from "./../../routes";
let web3;
export default class NewCampaign extends Component {
  state = {
    minimumContribution: "",
    errMessage: "",
    loader: true,
  };
  contri = (event) => {
    this.setState({ minimumContribution: event.target.value });
  };
  componentDidMount = async () => {
    web3 = await getweb3();
    return {};
  };
  createCamp = async (event) => {
    try {
      this.setState({ loader: false, errMessage: "" });
      event.preventDefault();
      const factory = new web3.eth.Contract(
        compileFactory.abi,
        "0xF64136dC4E11DCe268B8E2c3935CaCFFE32A724f"
      );
      const acc = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: acc[0],
        });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errMessage: err.message });
      console.log(err);
    }
    this.setState({ loader: true });
  };

  render() {
    return (
      <div className={style.body}>
        <Layout>
          <h1 style={{ marginTop: "4vh" }}>Create Campaign</h1>
          <Form error={!!this.state.errMessage} onSubmit={this.createCamp}>
            <Form.Field>
              <Label style={{ marginBottom: "10px" }}>
                Minimum contribution
              </Label>
              <Input
                fluid
                labelPosition="right"
                label="wei"
                placeholder="minimum contribution"
                value={this.state.minimumContribution}
                onChange={this.contri}
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
              <Message.Header>
                Your transaction is being processed
              </Message.Header>
              Please wait...
            </Message.Content>
          </Message>
        </Layout>
      </div>
    );
  }
}
