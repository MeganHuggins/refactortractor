import { expect } from 'chai';
import Hydration from '../src/Hydration';
import UserRepo from '../src/UserRepo';
import User from '../src/User';

describe('Hydration', function() {
  let hydrationData;
  let hydration;

  beforeEach(function() {
    hydrationData = [{
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 38
      },
      {
        "userID": 3,
        "date": "2019/05/09",
        "numOunces": 1
      },
      {
        "userID": 4,
        "date": "2019/04/15",
        "numOunces": 36
      },
      {
        "userID": 2,
        "date": "2018/10/23",
        "numOunces": 34
      },
      {
        "userID": 1,
        "date": "2020/04/07",
        "numOunces": 39
      },
      {
        "userID": 3,
        "date": "2020/04/07",
        "numOunces": 2
      },
      {
        "userID": 4,
        "date": "2020/04/07",
        "numOunces": 28
      },
      {
        "userID": 1,
        "date": "2020/04/08",
        "numOunces": 30
      },
      {
        "userID": 3,
        "date": "2020/04/08",
        "numOunces": 3
      },
      {
        "userID": 2,
        "date": "2020/04/08",
        "numOunces": 40
      },
      {
        "userID": 4,
        "date": "2020/04/08",
        "numOunces": 35
      },
      {
        "userID": 4,
        "date": "22020/04/09",
        "numOunces": 40
      },
      {
        "userID": 4,
        "date": "2020/04/10",
        "numOunces": 30
      },
      {
        "userID": 4,
        "date": "2020/04/11",
        "numOunces": 40
      },
      {
        "userID": 4,
        "date": "2020/04/12",
        "numOunces": 40
      },
      {
        "userID": 4,
        "date": "2020/04/13",
        "numOunces": 30
      },
      {
        "userID": 4,
        "date": "2020/04/14",
        "numOunces": 30
      },
    ]

    hydration = new Hydration(hydrationData);
  });

  it('should take in a list of data', function() {
    expect(hydration.hydrationData[0].userID).to.equal(1);
    expect(hydration.hydrationData[2].numOunces).to.equal(1);
    expect(hydration.hydrationData[4].date).to.equal('2018/10/23');
  });

  it('should find the average water intake per day for a user', function() {
    expect(hydration.calculateAverageOunces(3)).to.equal(2);
  });

  it('should find the water intake for a user on a specified date', function() {
    expect(hydration.calculateDailyOunces(1, "2019/06/15")).to.equal(37);
    expect(hydration.calculateDailyOunces(4, "2019/04/15")).to.equal(36);
  });

  it('should return a week\'s worth of hydration data', function() {
    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    const user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    const users = [user3, user4];

    const userRepo = new UserRepo(users);
    expect(hydration.calculateFirstWeekOunces(userRepo, 4)[0]).to.eql('2019/09/20: 40');
    expect(hydration.calculateFirstWeekOunces(userRepo, 4)[6]).to.eql('2019/04/15: 36');
  });

  it('should find sleep quality by day for that days week', function() {
    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    const user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });

    const users = [user3, user4];
    const userRepo = new UserRepo(users);
    expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
    expect(hydration.showEntireWeeksFluidConsumption(userRepo, 4).length).to.deep.eql(7);
  });
});
