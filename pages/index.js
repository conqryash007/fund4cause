import React, { Component } from "react";
import factory from "./../ethereum/factory";
import { Card, Button, Container } from "semantic-ui-react";
import Layouts from "./../components/Layouts";
import style from "./../styles.module.css";
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
      <div className={style.body}>
        <Layouts>
          <h1 style={{ marginLeft: "1vw" }}>Campaigns</h1>
          <Button
            href="/campaign/new"
            floated="right"
            content="Create Campaign"
            icon="add"
            primary
          ></Button>
          {this.renderCard()}
        </Layouts>
      </div>
    );
  }
}
