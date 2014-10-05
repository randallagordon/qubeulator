"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();

var QuestorDetail = require("qubeulator-components/shared/questor-detail");

lab.experiment("QuestorDetail", function() {
  lab.test("converts rarity to stars", function (done) {
    Lab.expect(QuestorDetail.type.prototype.rarityToStars(1)).to.equal("★");
    Lab.expect(QuestorDetail.type.prototype.rarityToStars(2)).to.equal("★★");
    Lab.expect(QuestorDetail.type.prototype.rarityToStars(3)).to.equal("★★★");
    Lab.expect(QuestorDetail.type.prototype.rarityToStars(4)).to.equal("★★★★");
    done();
  });
});
