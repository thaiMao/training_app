import React, { PureComponent } from "react";
import { object } from "prop-types";

const LOGIN_CONTEXT = "__context__";

function withCrendentials(Component) {
  function Wrapper(props, context) {
    const fieldContext = context[LOGIN_CONTEXT];
    return <Component {...fieldContext} {...props} />;
  }

  Wrapper.contextTypes = {
    [LOGIN_CONTEXT]: object
  };

  return Wrapper;
}

const userNameField = withCrendentials(function userNameField({ user }) {
  return <input type="text" value={user} />;
});

const passwordField = withCrendentials(function passwordField({ pass }) {
  return <input type="text" value={pass} />;
});

class Login extends PureComponent {
  static User = userNameField;
  static Password = passwordField;

  state = {
    user: "Username",
    pass: "Password"
  };

  static childContextTypes = {
    [LOGIN_CONTEXT]: object.isRequired
  };

  getChildContext() {
    const { user, pass } = this.state;
    return {
      [LOGIN_CONTEXT]: {
        user,
        pass
      }
    };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <form>{this.props.children}</form>
      </React.Fragment>
    );
  }
}

export default Login;
