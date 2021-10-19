import React from "react";
import { Menu } from "semantic-ui-react";

export default () => {
  return (
    <div>
      <Menu>
        <Menu.Item>Fund4cause</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>View Campaigns</Menu.Item>
          <Menu.Item>+</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};
