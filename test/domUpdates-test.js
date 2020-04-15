const chai = require('chai');
const expect = chai.expect;
const domUpdates = require('../src/domUpdates');
const spies = require('chai-spies');
chai.use(spies);

const user = {
  "id": 1,
  "name": "Luisa Hane",
  "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
  "email": "Diana.Hayes1@hotmail.com",
  "strideLength": 4.3,
  "dailyStepGoal": 10000,
  "friends": [16, 4, 8],
}

const sleepData = {
  "userID": 1,
  "date": "2019/06/15",
  "hoursSlept": 6.1,
  "sleepQuality": 2.2,
}

const hydrationData = {
  "userID": 1,
  "date": "2019/06/15",
  "numOunces": 37,
}

const activityData = {
  'userID': 1,
  'date': '2019/06/15',
  'numSteps': 3577,
  'minutesActive': 140,
  'flightsOfStairs': 16,
}

describe('DOM Updates', () => {

  it('Should load the page with ALL data', () => {
    chai.spy.on(domUpdates, 'loadPage', () => {});
    expect(domUpdates.domUpdates.loadPage).to.be.called(1);
    expect(domUpdates.domUpdates.loadPage).to.be.called.with([user, sleepData, activityData, hydrationData]);
  });

});
