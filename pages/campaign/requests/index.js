import React, { Component } from "react";
import Layout from "./../../../components/Layouts";
import style from "./../../../styles.module.css";
import { Button, Table } from "semantic-ui-react";
import { Link } from "./../../../routes";
import web3 from "./../../../ethereum/web3";
import camp from "./../../../ethereum/campaign";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const instance = await camp(props.query.addr);
    const size = await instance.methods.getRequestsCount().call();
    const requests = await Promise.all(
      Array(parseInt(size))
        .fill()
        .map((ele, i) => {
          return instance.methods.requests(i).call();
        })
    );
    console.log(requests);
    return {
      address: props.query.addr,
      requests,
      reqCount: size,
    };
  }

  render() {
    return (
      <div className={style.body}>
        <Layout>
          <h1>Requests</h1>
          <Link route={`/campaign/${this.props.address}/requests/new`}>
            <a>
              <Button content="Create Request" icon="add" primary></Button>
            </a>
          </Link>
          <Table celled structured striped textAlign="center" singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Recepient</Table.HeaderCell>
                <Table.HeaderCell>Approve</Table.HeaderCell>
                <Table.HeaderCell>Finalize</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </Layout>
      </div>
    );
  }
}

export default RequestIndex;
