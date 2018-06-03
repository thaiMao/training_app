const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
require('babel-polyfill')

global.fetch = require('jest-fetch-mock')

Enzyme.configure({ adapter: new Adapter() })
