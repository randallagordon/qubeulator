/** @jsx React.DOM */
/*jshint unused:false*/
"use strict";
var React = require("react");
var Router = require("react-router-component");
var Link = Router.Link;

module.exports = React.createClass({
  displayName: "Header",
  render: function () {
    /*jshint ignore:start*/
    return (
      <header>
        <ul className="qubeulator-menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/questors/">Questors</Link></li>
          <li><Link href="/collection/">Collection</Link></li>
        </ul>
      </header>
    );
    /*jshint ignore:end*/
  }
});
