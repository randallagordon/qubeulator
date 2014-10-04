/** @jsx React.DOM */
"use strict";

var React = require("react");
var QubeulatorApp = require("./components/qubeulatorapp.jsx");

React.renderComponent(
  /*exported QubeulatorApp */
  /*jshint ignore:start*/
  <QubeulatorApp />,
  /*jshint ignore:end*/
  document.body
);
