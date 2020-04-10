import domUpdates from './domUpdates';
let todaysDate;

class UserRepo {
  constructor(users, currentUser) {
    this.users = users;
    this.currentUser = currentUser;
  };

  // getDataFromID(id) {
  //   return this.users.find((user) => id === user.id);
  // };


  //we want this in our refactored work
  getDataSetForUser(dataSet) {
    return dataSet.filter(userData => userData.userID === this.currentUser.id);

  };

  calculateAverageStepGoal() {
    var totalStepGoal = this.users.reduce((sumSoFar, data) => {
      return sumSoFar = sumSoFar + data.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.users.length;
  };

  getDataFromPastWeek(dataSet, date) {

    let userDataSet = this.getDataSetForUser(dataSet).sort((a, b) => parseInt(a.date) - parseInt(b.date));
    todaysDate = domUpdates.findMostCurrentDate(userDataSet);

    // find index of date
    let indexOfCurrentDate = userDataSet.indexOf(userDataSet.find(data => data.date === todaysDate));
    // then work back 7 days from date we are working with
    let weeksWorthOfData = userDataSet.splice((indexOfCurrentDate - 7), 7);
    return weeksWorthOfData;
  };


  // makeSortedUserArray(user, dataSet) {
  //   let selectedID = user.userData.id;
  //   console.log('selectedID: ', selectedID);
  //
  //   let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   console.log(sortedByDate);
  //   return sortedByDate;
  // }


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
  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
    })
  };

//** chooseDayDataForAllUsers is only used once in the method getAllUserAverageForDay in Activity.js, the methods it's used in sleep are never used **
  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return dataItem.date === date
    });
  }

//** isolateUsernameAndRelevantData is called twice in the UserRepo.js in the methods of rankUserIDsbyRelevantDataValue and combineRankedUserIDsAndAveragedData. The methods it's used in sleep are never used **
  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce(function(objectSoFar, dataItem) {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]]
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData])
      }
      return objectSoFar;
    }, {});
  }

//** rankUserIDsbyRelevantDataValue is called only once in UserRepo.js in the method combineRankedUserIDsAndAveragedData **
  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort(function(b, a) {
      return (sortedObjectKeys[a].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[a].length) - (sortedObjectKeys[b].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / sortedObjectKeys[b].length)
    });
  }

//** combineRankedUserIDsAndAveragedData is only called once in the method getFriendsAverageStepsForWeek in Activity.js, the methods it's used in sleep are never used **
  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
    return rankedUsersAndAverages.map(function(rankedUser) {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce(
          function(sumSoFar, sleepQualityValue) {
            sumSoFar += sleepQualityValue
            return sumSoFar;
          }, 0) / sortedObjectKeys[rankedUser].length
      };
      return rankedUser;
    });
  }
}

export default UserRepo;
