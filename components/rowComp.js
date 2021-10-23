import React, { Component } from "react";
import { Table, Button, Popup } from "semantic-ui-react";
import getweb3 from "./../ethereum/getweb3";
import compileCamp from "./../ethereum/build/Campaign.json";
let web3;
let instance;
class Row extends Component {
  componentDidMount = async () => {
    web3 = await getweb3();
    instance = await new web3.eth.Contract(compileCamp.abi, this.props.address);
  };

  onApprove = async () => {
    const acc = await web3.eth.getAccounts();
    await instance.methods.approveRequest(this.props.id).send({
      from: acc[0],
    });
  };

  onFinalize = async () => {
    const acc = await web3.eth.getAccounts();
    await instance.methods.finalizeRequest(this.props.id).send({
      from: acc[0],
    });
  };

  render() {
    const style = {
      borderRadius: "0.4rem",
      backgroundColor: "black",
      opacity: 0.9,
      color: "white",
      padding: "1em",
    };

    const { Row, Cell } = Table;
    const { id, requests, address } = this.props;
    return (
      <Popup
        style={style}
        content="Congrats!!🥳 Request Finalized."
        trigger={
          <Row positive={requests.complete}>
            <Cell>{id + 1}</Cell>
            <Cell>{requests.description}</Cell>
            <Cell>{requests.value}</Cell>
            <Cell>{requests.recipient}</Cell>
            <Cell>{requests.approvalCount}</Cell>
            <Cell>
              {requests.complete ? null : (
                <Button color="green" basic onClick={this.onApprove}>
                  Approve
                </Button>
              )}
            </Cell>
            <Cell>
              {requests.complete ? null : (
                <Button color="teal" basic onClick={this.onFinalize}>
                  Finalize
                </Button>
              )}
            </Cell>
          </Row>
        }
      ></Popup>
    );
  }
}
export default Row;
