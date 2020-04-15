import domUpdates from './domUpdates';
let todaysDate;

class UserRepo {
  constructor(users, currentUser) {
    this.users = users;
    this.currentUser = currentUser;
  };

  //we want this in our refactored work
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

  getDataFromPastWeek(dataSet, todayDate) {
    let userDataSet = this.getDataSetForUser(dataSet).sort((a, b) => parseInt(a.date) - parseInt(b.date));
    todaysDate = domUpdates.findMostCurrentDate(userDataSet);

    let indexOfCurrentDate = userDataSet.indexOf(userDataSet.find(data => data.date === todaysDate));
    let weeksWorthOfData = userDataSet.splice((indexOfCurrentDate - 7), 7);
    return weeksWorthOfData;
  };

  // getFriendDataFromPastWeek(friendsActivity) {
  //   // let friendDataSet = currentUser.friends.map(friend => {
  //   //   return this.getDataSetForFriends(dataSet, friend)
  //   // })
  //   // .sort((a, b) => parseInt(a.date) - parseInt(b.date));
  //   let indexOfCurrentDate = friendsActivity.indexOf(friendsActivity.find(data => data.date === '2020/01/22'));
  //   let weeksWorthOfData = friendsActivity.splice((indexOfCurrentDate - 7), 7);
  //   return weeksWorthOfData;
  //
  //
  //   todaysDate = domUpdates.findMostCurrentDate(friendsActivity);
  //
  //   friendsActivity.reduce((acc, friend) =>{
  //     friend
  //   }, {})
  //
  // };

  // getToday(id, dataSet) { ***Didn't see this called anywhere
  //   return this.makeSortedUserArray(id, dataSet)[0].date;
  // };

  //** getFirstWeek is only called once in Hydration.js in the mthod calculateFirstWeekOunces**
  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  };

//** getWeekFromDate is called once in the workding method of userDataForWeek in Activity.js, once in the method calculateRandomWeekOunces in Hydration.js, and once in the working method of calculateWeekSleep in Sleep.js **
  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  };

//** chooseWeekDataForAllUsers is only called once in the method getFriendsAverageStepsForWeek in Acvitity.js, the methods it's used in sleep are never used **
  // chooseWeekDataForAllUsers(dataSet, date) {
  //   return dataSet.filter(function(dataItem) {
  //     return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
  //   })
  // };** Changed this to getFriendDataFromPastWeek**

//** chooseDayDataForAllUsers is only used once in the method getAllUserAverageForDay in Activity.js, the methods it's used in sleep are never used **

  chooseDayDataForAllUsers(activityData, date) {
    return activityData.filter(dataItem => {
      return dataItem.date === date
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
    console.log('friendsDataSets', friendsDataSets);

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
