import React, { PureComponent } from "react";
import Login from "Login";

class Home extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <h1>My Brand</h1>
        <button>Login</button>
        <Login>
          <Login.User />
          <Login.Password />
        </Login>
      </React.Fragment>
    );
  }
}

export default Home;
