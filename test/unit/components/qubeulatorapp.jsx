"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();

require("node-jsx").install();
var QubeulatorApp = require("../../../src/js/components/qubeulatorapp.jsx");

lab.experiment("QubeulatorApp", function() {
  lab.test("has a functional helper function", function (done) {
    Lab.expect(QubeulatorApp.type.prototype.someHelper()).to.equal("help!");
    done();
  });
});
