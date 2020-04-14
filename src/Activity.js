class Activity {
  constructor(activityData) {
    this.activityData = activityData
  };

  getAllUserAverageForDay(activityData, todaysDate, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(activityData, todaysDate);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  };

  userDataForToday(activityData, todaysDate, userRepo, relevantData) {
    let userData = userRepo.getDataSetForUser(activityData);
    return userData.find(data => data.date === todaysDate)[relevantData];
  };

  // userDataForWeek(id, date, userRepo, releventData) {
  //   return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  // }**Using the userRepo.getDataFromPastWeek method instead**

  // Friends

  getFriendsActivity(currentUser, userRepo) {
    let data = this.activityData;
    let userDataList = currentUser.friends.map(friend => {
      return userRepo.getDataSetForFriends(data, friend)
    });
    return userDataList.reduce((acc, listItem) => {
      return acc.concat(listItem);
    }, []);
  }

  getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo) {
    let friendsActivity = this.getFriendsActivity(currentUser, userRepo);
    // console.log('friendsActivity', friendsActivity);
    let timeline = userRepo.getFriendDataFromPastWeek(currentUser, friendsActivity, todaysDate);
    // console.log('timeline', timeline);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, todaysDate, 'numSteps', timeline)
  }

  showChallengeListAndWinner(currentUser, todaysDate, userRepo, activityData) {
    let rankedList = this.getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo);
    console.log('rankedList', rankedList);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataSetForUser(activityData).name;
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
