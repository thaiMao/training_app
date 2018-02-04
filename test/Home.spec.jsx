/* eslint-env  mocha */
import React from "react";
import Home from "../src/Home";

const { expect } = require("chai");

const { shallow } = require("enzyme");

describe("<Home /> ", () => {
  it("Should render a login button", () => {
    const wrapped = shallow(<Home />);

    expect(wrapped.contains(<button>Login</button>));

  });

  xit("Should render the brand", () => {
    const wrapped = shallow(<Home />);
    expect(wrapped.contains(<h1>My Brand</h1>)).to.be.true;
  });
});
