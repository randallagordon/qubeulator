/** @jsx React.DOM */
"use strict";

var React = require("react");

// Attach React to window so React DevTools has access to it
// TODO: Guard with envify for production builds
window.React = React;

var QubeulatorApp = require("./components/qubeulatorapp.jsx");

React.renderComponent(
  /*exported QubeulatorApp */
  /*jshint ignore:start*/
  <QubeulatorApp />,
  /*jshint ignore:end*/
  document.body
);
