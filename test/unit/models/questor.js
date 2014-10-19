//  a = new (require("qubeulator-components/models/questor"))(require("lodash").where(require("./src/js/data/questors"), { name: "Arges the Brightfire" })[0])
"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();

var Questor = require("qubeulator-components/models/questor");
var testQuestor = require("../../fixtures/testquestor.json");

lab.experiment("Model Questor", function() {
  lab.test("can be created", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.name).to.equal("Musketeer");
    done();
  });
  lab.test("defaults evolution and level to 0", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.evolution).to.equal(0);
    Lab.expect(questor.level).to.equal(0);
    done();
  });
  lab.test("derives its current attributes", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.currentAttributes)
      .to.exist;
    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strengthLow);
    done();
  });
  lab.test("updates its current attributes throughout level progression", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strengthLow);

    questor.level = 1;

    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strengthLow + testQuestor.upgrade.strength * 1);

    questor.level = 5;

    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strengthLow + testQuestor.upgrade.strength * 5);

    done();
  });
  lab.test("can only have level set to 0-5", function (done) {
    var questor = new Questor(testQuestor);
    var e;

    Lab.expect(questor.level)
      .to.equal(0);

    questor.level = 1;

    Lab.expect(questor.level)
      .to.equal(1);

    try {
      questor.level = 6;
    } catch (error) {
      e = error;
    }

    Lab.expect(e)
      .to.exist;
    Lab.expect(questor.level)
      .to.equal(1);

    done();
  });
});
