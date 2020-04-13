class Activity {
  constructor(activityData) {
    this.activityData = activityData
  }
  // getMilesFromStepsByDate(id, date, userRepo) {
  //   let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
  //   return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1));
  // }
  // getActiveMinutesByDate(id, date) {
  //   let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
  //   return userActivityByDate.minutesActive;
  // }
  // calculateActiveAverageForWeek(id, date, userRepo) {
  //   return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => {
  //     return acc += elem.minutesActive;
  //   }, 0) / 7).toFixed(1));
  // }
  // accomplishStepGoal(id, date, userRepo) {
  //   let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
  //   if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
  //     return true;
  //   }
  //   return false
  // }
  // getDaysGoalExceeded(id, userRepo) {
  //   return this.activityData.filter(data => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  // }
  // getStairRecord(id) {
  //   return this.activityData.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  // }
  getAllUserAverageForDay(currentDate, userRepo, todaysDate) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }

  userDataForToday(id, todaysDate, userRepo, activityData) {
    let userData = userRepo.getDataSetForUser(activityData);
    return userData.find(data => data.date === date)[relevantData];
  }

  userDataForWeek(id, date, userRepo, releventData) {
    return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  }

  // Friends

  getFriendsActivity(currentUser, userRepo) {
    let data = this.activityData;
    let userDataList = currentUser.friends.map(friend => {
      return userRepo.getDataSetForFriends(data, friend)
    });
    console.log('userDataList', userDataList);
    return userDataList.reduce((acc, listItem) => {
      return acc.concat(listItem);
    }, []);
  }

  getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo) {
    let friendsActivity = this.getFriendsActivity(currentUser, userRepo);
    let timeline = userRepo.getFriendDataFromPastWeek(currentUser, friendsActivity, todaysDate);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, todaysDate, 'numSteps', timeline)
  }

  showChallengeListAndWinner(currentUser, todaysDate, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }

  showcaseWinner(user, date, userRepo) {
    let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }

  getStreak(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }

  getWinnerId(currentUser, todaysDate, userRepo) {
    let rankedFriendsList = this.getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo);
    let keysList = rankedFriendsList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default Activity;
