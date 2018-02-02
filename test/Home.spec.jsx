/* eslint-env  mocha */

const { expect } = require("chai");
const React = require("react");
const Home = require("../src/Home");
const Button = require("../src/Button");
const { shallow } = require("enzyme");

describe("<Home /> ", () => {
  it("Should render a login button", () => {
    const wrapped = shallow(<Home />);
    expect(wrapped.contains(<Button>Login</Button>));
  });

  xit("Should render the brand", () => {
    const wrapped = shallow(<Home />);
    expect(wrapped.contains(<h1>My Brand</h1>)).to.be.true;
  });
});
