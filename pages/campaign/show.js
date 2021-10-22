import React, { Component } from "react";
import Layouts from "./../../components/Layouts";
import style from "./../../styles.module.css";
import Campaign from "./../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import Form from "./../../components/contributeForm";
import { Link } from "./../../routes";

export default class show extends Component {
  static async getInitialProps(props) {
    const instance = await Campaign(props.query.addr);
    const summary = await instance.methods.getSummary().call();
    return {
      address: props.query.addr,
      minContribution: summary["0"],
      balance: summary["1"],
      requestCount: summary["2"],
      approversCount: summary["3"],
      manager: summary["4"],
    };
  }
  getCards = () => {
    const { minContribution, manager, approversCount, requestCount, balance } =
      this.props;

    const item = [
      {
        header: manager,
        meta: "Address of Creator",
        description:
          "The creator of this contract can invoke request for withdraw",
        style: { overflowWrap: "break-word" },
        color: "pink",
      },
      {
        header: minContribution,
        meta: "Minimum contribution (in Wei)",
        description: "This is the minimum amount for contributing",
        style: { overflowWrap: "break-word" },
        color: "pink",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description: "Number of people who have donated to the campaign",
        style: { overflowWrap: "break-word" },
        color: "pink",
      },
      {
        header: requestCount,
        meta: "Number of requests",
        description: "A request is permissiom to withdraw ether from contract",
        style: { overflowWrap: "break-word" },
        color: "pink",
      },
      {
        header: balance,
        meta: "Campaign Balance (in wei)",
        description: "Total money left in the campaign",
        style: { overflowWrap: "break-word" },
        color: "pink",
      },
    ];

    return <Card.Group items={item} />;
  };
  render() {
    return (
      <div className={style.body}>
        <Layouts>
          <Grid>
            <Grid.Column width={10}>
              {this.getCards()}
              <Link route={`/campaign/${this.props.address}/requests`}>
                <a>
                  <Button primary style={{ marginTop: "10px" }}>
                    View Requests
                  </Button>
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form address={this.props.address}></Form>
            </Grid.Column>
          </Grid>
        </Layouts>
      </div>
    );
  }
}
