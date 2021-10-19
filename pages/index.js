import React, { Component } from "react";
import factory from "./../ethereum/factory";
import web3 from "./../ethereum/web3";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layouts from "./../components/Layouts";

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCard() {
    const items = this.props.campaigns.map((data) => {
      return {
        header: data,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <Layouts>
          {this.renderCard()}
          <Button content="Create Campaign" icon="add"></Button>
        </Layouts>
      </div>
    );
  }
}
