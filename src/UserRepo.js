import domUpdates from './domUpdates';
let todaysDate;

class UserRepo {
  constructor(users, currentUser) {
    this.users = users;
    this.currentUser = currentUser;
  };

  getDataSetForUser(dataSet) {
    return dataSet.filter(userData => userData.userID === this.currentUser.id);
  };

  getDataSetForFriends(dataSet, friends) {
    let friendsDataSets = dataSet.filter(friendData => friendData.userID === friends)
    return friendsDataSets.splice((friendsDataSets.length - 7), 7);
  };

  calculateAverageStepGoal() {
    var totalStepGoal = this.users.reduce((sumSoFar, data) => {
      return sumSoFar = sumSoFar + data.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.users.length;
  };

  getDataFromPastWeek(dataSet) {
    let userDataSet = this.getDataSetForUser(dataSet).sort((a, b) => parseInt(a.date) - parseInt(b.date));
    todaysDate = domUpdates.findMostCurrentDate(userDataSet);

    let indexOfCurrentDate = userDataSet.indexOf(userDataSet.find(data => data.date === todaysDate));
    let weeksWorthOfData = userDataSet.splice((indexOfCurrentDate - 7), 7);
    return weeksWorthOfData;
  };

  chooseDayDataForAllUsers(activityData, date) {
    return activityData.filter(dataItem => {
      return dataItem.date === date;
    });
  }

  createFriendsDataSetObj(friendsActivity, todaysDate, relevantData) {
    return friendsActivity.reduce((acc, dataItem) => {
      dataItem.forEach(item => {
        if (!acc[item.userID]) {
          acc[item.userID] = [item[relevantData]]
        } else {
          acc[item.userID].push(item[relevantData])
        }
      })
      return acc;
    }, {});
  }

  rankFriendsByDataSets(friendsActivity, todaysDate, relevantData) {
    let friendsDataSets = this.createFriendsDataSetObj(friendsActivity, todaysDate, 'numSteps');

    return Object.keys(friendsDataSets).sort((a, b) => {
      return (friendsDataSets[b].reduce((acc, curr) => {
        acc += curr
        return acc;
      }, 0) / friendsDataSets[b].length) - (friendsDataSets[a].reduce(function(acc, curr) {
        acc += curr
        return acc;
      }, 0) / friendsDataSets[a].length)
    });
  }

  friendStepsRankings(friendsActivity, todaysDate, releventData) {
    return this.rankFriendsByDataSets(friendsActivity, todaysDate, releventData);
  }
}

export default UserRepo;
