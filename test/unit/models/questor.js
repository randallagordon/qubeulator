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
  lab.test("defaults evolution to 1 and level to 0", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.evolution).to.equal(1);
    Lab.expect(questor.level).to.equal(0);
    done();
  });
  lab.test("derives its current attributes", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.currentAttributes)
      .to.exist;
    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strength);
    done();
  });
  lab.test("updates its current attributes throughout level progression", function (done) {
    var questor = new Questor(testQuestor);

    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strength);
    Lab.expect(questor.currentAttributes.health)
      .to.equal(testQuestor.baseAttributes.health);
    Lab.expect(questor.currentAttributes.speed)
      .to.equal(testQuestor.baseAttributes.speed);
    Lab.expect(questor.currentAttributes.perSecond)
      .to.equal(testQuestor.baseAttributes.perSecond);

    questor.set({ level: 1 });

    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strength + testQuestor.upgrade.strength * 1);
    Lab.expect(questor.currentAttributes.health)
      .to.equal(testQuestor.baseAttributes.health + testQuestor.upgrade.health * 1);
    Lab.expect(questor.currentAttributes.speed)
      .to.equal(testQuestor.baseAttributes.speed + testQuestor.upgrade.speed * 1);
    Lab.expect(questor.currentAttributes.perSecond)
      .to.equal(testQuestor.baseAttributes.perSecond + testQuestor.upgrade.perSecondProgression[0]);

    questor.set({ level: 5 });

    Lab.expect(questor.currentAttributes.strength)
      .to.equal(testQuestor.baseAttributes.strength + testQuestor.upgrade.strength * 5);
    Lab.expect(questor.currentAttributes.health)
      .to.equal(testQuestor.baseAttributes.health + testQuestor.upgrade.health * 5);
    Lab.expect(questor.currentAttributes.speed)
      .to.equal(testQuestor.baseAttributes.speed + testQuestor.upgrade.speed * 5);
    Lab.expect(questor.currentAttributes.perSecond)
      .to.equal(testQuestor.baseAttributes.perSecond + testQuestor.upgrade.perSecondProgression[4]);

    questor.set({ level: 0, evolution: 2 });

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
