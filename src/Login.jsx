import React, { PureComponent } from "react";
import { object } from "prop-types";

const LOGIN_CONTEXT = "__context__";

function userNameField(props, context) {
  const { user } = context[LOGIN_CONTEXT];
  return <input type="text" value={user} />;
}

userNameField.contextTypes = {
  [LOGIN_CONTEXT]: object
};

function passwordField(props, context) {
  const { pass } = context[LOGIN_CONTEXT];
  return <input type="text" value={pass} />;
}

passwordField.contextTypes = {
  [LOGIN_CONTEXT]: object
};

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
