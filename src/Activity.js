class Activity {
  constructor(activityData) {
    this.activityData = activityData
  };

  getAllUserAverageForDay(activityData, todaysDate, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(activityData, todaysDate);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  };

  userDataForToday(dataSet, date, userID, relevantData) {
    let allDataForCurrentUser = dataSet.filter(data => data.userID === userID);
    let dataForSpecificDate = allDataForCurrentUser.find(data => data.date === date);
    return dataForSpecificDate[relevantData];
  };

  // Friends

  getFriendsActivity(currentUser, userRepo) {
    let data = this.activityData;
    return currentUser.friends.map(friend => {
      return userRepo.getDataSetForFriends(data, friend);
    });
  }

  getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo) {
    let friendsActivity = this.getFriendsActivity(currentUser, userRepo);
    return userRepo.friendStepsRankings(friendsActivity, todaysDate, 'numSteps')
  }

  showChallengeListAndWinner(currentUser, todaysDate, userRepo, activityData) {
    let rankedList = this.getFriendsAverageStepsForWeek(currentUser, todaysDate, userRepo);

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
    return rankedFriendsList[0];
  }
}



export default Activity;
