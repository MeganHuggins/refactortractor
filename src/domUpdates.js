import $ from 'jquery';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';


let userRepo, currentUser, activity;
let headerText = document.getElementById('headerText');
let sidebarName = document.getElementById('sidebarName');
let stepGoalCard = document.getElementById('stepGoalCard');
let userAddress = document.getElementById('userAddress');
let userEmail = document.getElementById('userEmail');
let userStridelength = document.getElementById('userStridelength');
let friendList = document.getElementById('friendList');


const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {
    // today = moment().format('YYYY-MM-DD');
    // sleepData = new Sleep(sleepData);
    // activityData = new Activity(activityData);
    // hydrationData = new Hydration(hydrationData);
    currentUser = domUpdates.findRandomUser(users);
    userRepo = new UserRepo(users, currentUser);
    activity = new Activity(activityData);
    userRepo.getDataFromPastWeek(hydrationData);
    domUpdates.addInfoToSidebar(userRepo);
    domUpdates.makeWinnerID(activityData);



    // var sortedArray = userRepo.getDataSetForUser(sleepData);


  },

  findRandomUser: (users) => {
    for (let i = users.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * (i + 1));
      [users[i], users[n]] = [users[n], users[i]];
    }
    return new User(users[0], users);


  },

  findMostCurrentDate: (dataSet) => {
    return dataSet[dataSet.length - 1].date;
  },

  //
  // populateLastWeeksData: () => {
  //
  // },

  addInfoToSidebar: (userRepo) => {
    sidebarName.innerText = currentUser.name;
    headerText.innerText = `${currentUser.getFirstName()}'s Activity Tracker`;
    stepGoalCard.innerText = `Your daily step goal is ${currentUser.dailyStepGoal}.`
    avStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
    userAddress.innerText = currentUser.address;
    userEmail.innerText = currentUser.email;
    userStridelength.innerText = `Your stridelength is ${currentUser.strideLength} meters.`;
    friendList.insertAdjacentHTML('afterBegin', domUpdates.makeFriendHTML(userRepo))
  },

  makeFriendHTML: (userRepo) => {
    let friends = currentUser.getFriendsNames(userRepo);
    return friends.map(friend => `<li class='historical-list-listItem'>${friend}</li>`).join('');
  },

  makeWinnerID: (activityData) => {
    let todaysDate = domUpdates.findMostCurrentDate(activityData);
    let weiner = activity.getWinnerId(currentUser, todaysDate, userRepo);
    console.log(weiner);
  }



}




export default domUpdates;