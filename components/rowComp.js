import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class Row extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, requests, address } = this.props;
    console.log(this.props);
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{requests.description}</Cell>
        <Cell>{requests.value}</Cell>
        <Cell>{requests.recipient}</Cell>
        <Cell>{requests.approvalCount}</Cell>
        <Cell>
          <Button color="green" basic>
            Approve
          </Button>
        </Cell>
        <Cell></Cell>
      </Row>
    );
  }
}
export default Row;
