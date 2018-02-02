import React, { PureComponent } from "react";
import Button from "./Button";

class Home extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <h1>My Brand</h1>
        <Button>Login</Button>
      </React.Fragment>
    );
  }
}

export default Home;
