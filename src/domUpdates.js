import $ from 'jquery';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';


let userRepo, currentUser, activity, todaysDate, winnerID;
let headerText = document.getElementById('headerText');
let sidebarName = document.getElementById('sidebarName');
let stepGoalCard = document.getElementById('stepGoalCard');
let userAddress = document.getElementById('userAddress');
let userEmail = document.getElementById('userEmail');
let userStridelength = document.getElementById('userStridelength');
let friendList = document.getElementById('friendList');
let userStairsToday = document.getElementById('userStairsToday');


const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {
    // today = moment().format('YYYY-MM-DD');
    // sleepData = new Sleep(sleepData);
    // activityData = new Activity(activityData);
    // hydrationData = new Hydration(hydrationData);
    todaysDate = domUpdates.findMostCurrentDate(activityData);
    currentUser = domUpdates.findRandomUser(users);
    userRepo = new UserRepo(users, currentUser);
    activity = new Activity(activityData);
    userRepo.getDataFromPastWeek(hydrationData);
    domUpdates.addInfoToSidebar(userRepo);
    domUpdates.addActivityInfo(activityData);
    // domUpdates.makeWinnerName(activityData, users);
    // domUpdates.addFriendGameInfo(activityData)
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

  makeWinnerHTML: (winnerName) => {
    let winner = winnerName
    return `<li class="historical-list-listItem">${winner} did the most steps</li>`;
  },

  makeActivitiesHTML: (activityData, userRepo, weekOfUserActivityData, relevantData) => {
    let typeOfActivity;

    if(relevantData === 'numSteps') {
     typeOfActivity = 'steps'
    } else if (relevantData === 'flightsOfStairs') {
      typeOfActivity = 'flights of stairs'
    } else if (relevantData === 'minutesActive') {
      typeOfActivity = 'minutes of activity'
    };

    return weekOfUserActivityData.map(day => `<li class="historical-list-listItem">On ${day.date} you did ${day[relevantData]} ${typeOfActivity}</li>`).join('');
  },

  makeFriendChallengeHTML: (id, activityInfo, userStorage, method) => {
    return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  },

  makeWinnerName: (activityData, users) => {
    console.log('users', users);
    let winnerID = parseInt(activity.getWinnerId(currentUser, todaysDate, userRepo));
    let winnerInfo = userRepo.users.find(user => user.id === winnerID);
    console.log('winnerInfo', winnerInfo);
    return winnerInfo.name
  },

  addActivityInfo: (activityData) => {
    userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activity.userDataForToday(activityData, '2020/01/22', currentUser.id, 'flightsOfStairs')}</span></p>`);

    avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(activityData, todaysDate, userRepo, 'flightsOfStairs')}</span></p>`);

    userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activity.userDataForToday(activityData, '2020/01/22', currentUser.id, 'numSteps')}</span></p>`);

    avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(activityData, todaysDate, userRepo, 'numSteps')}</span></p>`);

    userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activity.userDataForToday(activityData, '2020/01/22', currentUser.id, 'minutesActive')}</span></p>`);

    avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(activityData, todaysDate, userRepo, 'minutesActive')}</span></p>`);

    userStepsThisWeek.insertAdjacentHTML("afterBegin", domUpdates.makeActivitiesHTML(activityData, userRepo, userRepo.getDataFromPastWeek(activityData, todaysDate), 'numSteps'));

    userStairsThisWeek.insertAdjacentHTML("afterBegin", domUpdates.makeActivitiesHTML(activityData, userRepo, userRepo.getDataFromPastWeek(activityData, todaysDate), 'flightsOfStairs'));

    userMinutesThisWeek.insertAdjacentHTML("afterBegin", domUpdates.makeActivitiesHTML(activityData, userRepo, userRepo.getDataFromPastWeek(activityData, todaysDate), 'minutesActive'));

    bestUserSteps.insertAdjacentHTML("afterBegin", domUpdates.makeWinnerHTML(domUpdates.makeWinnerName(activityData, userRepo)));
  },

  // addFriendGameInfo: (activityData) => {
  //   friendChallengeListToday.insertAdjacentHTML("afterBegin", domUpdates.makeFriendChallengeHTML(activityData, userRepo, activity.showChallengeListAndWinner(currentUser, todaysDate, userRepo, activityData)));
  // },

}




export default domUpdates;
