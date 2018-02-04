import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

require("babel-register");
require("babel-polyfill");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
global.document = new JSDOM("<body><div id='app'></div></body>").window;

global.window = document.defaultView;
global.navigator = global.document.window.navigator;
