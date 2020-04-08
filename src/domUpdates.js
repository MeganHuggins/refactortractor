import $ from 'jquery';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';

import moment from 'moment';

let userRepo, currentUser;

const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {
    // sleepData = new Sleep(sleepData);
    // activityData = new Activity(activityData);
    // hydrationData = new Hydration(hydrationData);
    currentUser = domUpdates.findRandomUser(users);
    userRepo = new UserRepo(users, currentUser);
    userRepo.getDataFromPastWeek(sleepData);
  },

  findRandomUser: (users) => {
    for (let i = users.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * (i + 1));
      [users[i], users[n]] = [users[n], users[i]];
    }
    return new User(users[0]);
  },

  findMostCurrentDate: (dataSet) => {
    return dataSet[dataSet.length - 1].date;
  },


  populateLastWeeksData: () => {

  }
  // function makeToday(userRepo, currentUserID, hydrationData) {
  //   var sortedArray = userRepo.makeSortedUserArray(currentUserID, hydrationData);
  //   return sortedArray[0].date;
  // }

}

export default domUpdates;
