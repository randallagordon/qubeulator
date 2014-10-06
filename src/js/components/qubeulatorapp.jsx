/** @jsx React.DOM */
/*jshint unused:false*/
"use strict";
var _ = require("lodash");
var React = require("react");
var Router = require("react-router-component");
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;
var NotFound = Router.NotFound;

var MainPage = require("./mainpage.jsx");
var NotFoundPage = require("./notfoundpage.jsx");
var Header = require("./header.jsx");
var Footer = require("./footer.jsx");

var Questors = require("qubeulator-components/questors");
var Collection = require("qubeulator-components/collection");

var questors = require("../data/questors.json");
questors = _.sortBy(questors, "name");

module.exports = React.createClass({
  someHelper: function () { return "help!"; },
  render: function() {
    /*jshint ignore:start*/
    return (
      <div>
        <Header/>
        <Locations>
          <Location path="/" handler={MainPage} />
          <Location path="/questors/*" handler={Questors} />
          <Location path="/collection/*" handler={Collection} questors={questors} />
          <NotFound handler={NotFoundPage} />
        </Locations>
        <Footer/>
      </div>
    );
    /*jshint ignore:end*/
  }
});
