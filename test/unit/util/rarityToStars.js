"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();

var rarityToStars = require("qubeulator-components/util/rarityToStars");

lab.experiment("rarityToStars", function() {
  lab.test("converts rarity to stars", function (done) {
    Lab.expect(rarityToStars(1)).to.equal("★");
    Lab.expect(rarityToStars(2)).to.equal("★★");
    Lab.expect(rarityToStars(3)).to.equal("★★★");
    Lab.expect(rarityToStars(4)).to.equal("★★★★");
    done();
  });
});
