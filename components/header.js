import React, { Component, createRef } from "react";
import { Menu, Sticky, Image, Icon } from "semantic-ui-react";
import { Link } from "./../routes";

export default class Header extends Component {
  contextRef = createRef();
  render() {
    return (
      <div>
        <Sticky innerref={this.contextRef}>
          <Menu inverted fluid size="huge">
            <Link route="/">
              <a className="item">Fund4cause</a>
            </Link>

            <Image centered size="medium" src="/3.gif"></Image>

            <Menu.Menu position="right">
              <Link route="/">
                <a className="item">View Campaigns</a>
              </Link>
              <Link route="/campaign/new">
                <a className="item">
                  <Icon name="add"></Icon>
                </a>
              </Link>
            </Menu.Menu>
          </Menu>
        </Sticky>
      </div>
    );
  }
}
