import $ from 'jquery';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';

import moment from 'moment';

let today, userRepo, user, todaysDate;

const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {
    // today = moment().format('YYYY-MM-DD');
    // sleepData = new Sleep(sleepData);
    // activityData = new Activity(activityData);
    // hydrationData = new Hydration(hydrationData);
    domUpdates.findRandomUser(users);
    userRepo = new UserRepo(users, user);
    domUpdates.findMostCurrentDate(sleepData);

    // var sortedArray = userRepo.getDataSetForUser(sleepData);


  },

  findRandomUser: (users) => {
    for (let i = users.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * (i + 1));
      [users[i], users[n]] = [users[n], users[i]];
    }
    user = new User(users[0]);


  },

  findMostCurrentDate: (dataSet) => {
    todaysDate = dataSet[dataSet.length - 1].date;

    // userRepo.getDataFromPastWeek(dataSet, todaysDate);
    // var sortedArray = usersRepo.makeSortedUserArray(user, dataSet);

    // let blah = sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
  },


  populateLastWeeksData: () => {

  }
  // function makeToday(userRepo, currentUserID, hydrationData) {
  //   var sortedArray = userRepo.makeSortedUserArray(currentUserID, hydrationData);
  //   return sortedArray[0].date;
  // }

}

export default domUpdates;
