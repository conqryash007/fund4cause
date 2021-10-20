import React, { Component, createRef } from "react";
import { Menu, Sticky, Image } from "semantic-ui-react";

export default class Header extends Component {
  contextRef = createRef();
  render() {
    return (
      <div>
        <Sticky innerref={this.contextRef}>
          <Menu inverted fluid size="huge">
            <Menu.Item active>Fund4cause</Menu.Item>

            <Image centered size="medium" src="/3.gif"></Image>

            <Menu.Menu position="right">
              <Menu.Item color="black">View Campaigns</Menu.Item>
              <Menu.Item>+</Menu.Item>
            </Menu.Menu>
          </Menu>
        </Sticky>
      </div>
    );
  }
}
