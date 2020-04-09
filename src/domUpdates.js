import $ from 'jquery';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';


let userRepo, currentUser, activity, mostCurrentDateInDataSet;
let headerText = document.getElementById('headerText');
let sidebarName = document.getElementById('sidebarName');
let stepGoalCard = document.getElementById('stepGoalCard');
let userAddress = document.getElementById('userAddress');
let userEmail = document.getElementById('userEmail');
let userStridelength = document.getElementById('userStridelength');
let friendList = document.getElementById('friendList');
let historicalWeek = document.querySelectorAll('.historicalWeek');

const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {
    // today = moment().format('YYYY-MM-DD');
    // sleepData = new Sleep(sleepData);
    // activityData = new Activity(activityData);
    // hydrationData = new Hydration(hydrationData);
    mostCurrentDateInDataSet = domUpdates.findMostCurrentDate(hydrationData);
    currentUser = domUpdates.findRandomUser(users);
    domUpdates.findMostCurrentDate(hydrationData);
    userRepo = new UserRepo(users, currentUser, mostCurrentDateInDataSet);
    activity = new Activity(activityData);
    userRepo.getDataFromPastWeek(hydrationData);
    domUpdates.addInfoToSidebar(userRepo);
    // domUpdates.makeWinnerID(activityData);
    domUpdates.populateLastWeeksData();



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
    let sortedData = dataSet.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    return sortedData[sortedData.length - 1].date;
  },


  populateLastWeeksData: () => {
      historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${mostCurrentDateInDataSet}`));
      // addInfoToSidebar(currentUser, userRepo);

  },

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
    let mostCurrentDateInDataSet = domUpdates.findMostCurrentDate(activityData);
    let weiner = activity.getWinnerId(currentUser, mostCurrentDateInDataSet, userRepo);
  }



}




export default domUpdates;
