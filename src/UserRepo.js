import domUpdates from './domUpdates';
let todaysDate;
//**should we pass todays date into constructor?**

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
    return dataSet.filter(friendData => friendData.userID === friends);
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

  getFriendDataFromPastWeek(friendsActivity) {
    // let friendDataSet = currentUser.friends.map(friend => {
    //   return this.getDataSetForFriends(dataSet, friend)
    // })
    // .sort((a, b) => parseInt(a.date) - parseInt(b.date));
    todaysDate = domUpdates.findMostCurrentDate(friendsActivity);

    let indexOfCurrentDate = friendsActivity.indexOf(friendsActivity.find(data => data.date === todaysDate));
    let weeksWorthOfData = friendsActivity.splice((indexOfCurrentDate - 7), 7);
    return weeksWorthOfData;
  };

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

//createFriendsDataSetObj is called twice in the UserRepo.js in the methods of rankUserIDsbyRelevantDataValue and combineFriendsRankingWithAveragedData. The methods it's used in sleep are never used

  createFriendsDataSetObj(friendsActivity, todaysDate, relevantData, timeline) {
    return timeline.reduce((acc, dataItem) => {
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

//rankUserIDsbyRelevantDataValue is called only once in UserRepo.js in the method combineFriendsRankingWithAveragedData
  rankFriendsByDataSets(friendsActivity, todaysDate, relevantData, timeline) {
    let friendsDataSets = this.createFriendsDataSetObj(friendsActivity, todaysDate, 'numSteps', timeline);

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

//combineFriendsRankingWithAveragedData is only called once in the method getFriendsAverageStepsForWeek in Activity.js, the methods it's used in sleep are never used

  combineFriendsRankingWithAveragedData(friendsActivity, todaysDate, releventData, timeline) {

    let friendRankings = this.rankFriendsByDataSets(friendsActivity, todaysDate, releventData, timeline);


    return friendRankings.map(friend => {
      // rankedUser = {
      //   [rankedUser]: sortedObjectKeys[rankedUser].reduce(
      //     function(sumSoFar, sleepQualityValue) {
      //       sumSoFar += sleepQualityValue
      //       return sumSoFar;
      //     }, 0) / sortedObjectKeys[rankedUser].length
      // };
      // return rankedUser;
    });
  }
}

export default UserRepo;
