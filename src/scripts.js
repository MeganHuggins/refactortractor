
import './css/style.scss';
import domUpdates from './domUpdates';


const usersData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
  .then(response => response.json())
  .then(data => data.userData)
  .catch(error => console.log(`There was an error obtaining userData ${error}`))

const sleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
  .then(response => response.json())
  .then(data => data.sleepData)
  .catch(error => console.log(`There was an error obtaining sleepData ${error}`))

const activityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
  .then(response => response.json())
  .then(data => data.activityData)
  .catch(error => console.log(`There was an error obtaining activityData ${error}`))

const hydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  .then(response => response.json())
  .then(data => data.hydrationData)
  .catch(error => console.log(`There was an error obtaining hydrationData ${error}`))

Promise.all([usersData, sleepData, activityData, hydrationData])
  .then(data => {
    const users = data[0];
    const sleep = data[1];
    const activity = data[2];
    const hydration = data[3];
    domUpdates.loadPage(users, sleep, activity, hydration);
  })
  .catch(error => console.log(`There was an error obtaining all data ${error}`))



// import './css/style.scss';
// import './images/person walking on path.jpg';
// import './images/The Rock.jpg';
// import userData from './data/users-DONTUSE';
// import hydrationData from './data/hydration-DONTUSE';
// import sleepData from './data/sleep-DONTUSE';
// import activityData from './data/activity-DONTUSE';
//
// import User from './User';
// import Activity from './Activity';
// import Hydration from './Hydration';
// import Sleep from './Sleep';
// import UserRepo from './User-repo';
//
// var sidebarName = document.getElementById('sidebarName');**
// var stepGoalCard = document.getElementById('stepGoalCard');**
// var headerText = document.getElementById('headerText');**
// var userAddress = document.getElementById('userAddress');**
// var userEmail = document.getElementById('userEmail');**
// var userStridelength = document.getElementById('userStridelength');**
// var friendList = document.getElementById('friendList');**


// var hydrationToday = document.getElementById('hydrationToday');
// var hydrationAverage = document.getElementById('hydrationAverage');
// var hydrationThisWeek = document.getElementById('hydrationThisWeek');
// var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
// var historicalWeek = document.querySelectorAll('.historicalWeek');
// var sleepToday = document.getElementById('sleepToday');
// var sleepQualityToday = document.getElementById('sleepQualityToday');
// var avUserSleepQuality = document.getElementById('avUserSleepQuality');
// var sleepThisWeek = document.getElementById('sleepThisWeek');
// var sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
// var friendChallengeListToday = document.getElementById('friendChallengeListToday');
// var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
// var bigWinner = document.getElementById('bigWinner');
// var userStepsToday = document.getElementById('userStepsToday');
// var avgStepsToday = document.getElementById('avgStepsToday');
// var userStairsToday = document.getElementById('userStairsToday');
// var avgStairsToday = document.getElementById('avgStairsToday');
// var userMinutesToday = document.getElementById('userMinutesToday');
// var avgMinutesToday = document.getElementById('avgMinutesToday');
// var userStepsThisWeek = document.getElementById('userStepsThisWeek');
// var userStairsThisWeek = document.getElementById('userStairsThisWeek');
// var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
// var bestUserSteps = document.getElementById('bestUserSteps');
// var streakList = document.getElementById('streakList');
// var streakListMinutes = document.getElementById('streakListMinutes')
//
// function startApp() {
//   // let userList = []; dont need**
//   // makeUsers(userList); dont need**
//   let userRepo = new UserRepo(userList); **
//   let hydrationRepo = new Hydration(hydrationData); **
//   let sleepRepo = new Sleep(sleepData); **
//   let activityRepo = new Activity(activityData); **
//   var currentUserID = pickUser(); **
//   let currentUser = getUserById(currentUserID, userRepo); **
//   let today = makeToday(userRepo, currentUserID, hydrationData); ** No longer getting random date/ now current date

  // let randomHistory = makeRandomDate(userRepo, currentUserID, hydrationData);
  //
  // historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${todaysDate}`));
  // addInfoToSidebar(currentUser, userRepo);


//   addHydrationInfo(currentUserID, hydrationRepo, today, userRepo, randomHistory);
//   addSleepInfo(currentUserID, sleepRepo, today, userRepo, randomHistory);
//   let winnerNow = makeWinnerID(activityRepo, currentUser, today, userRepo);
//   addActivityInfo(currentUserID, activityRepo, today, userRepo, randomHistory, currentUser, winnerNow);
//   addFriendGameInfo(currentUserID, activityRepo, userRepo, today, randomHistory, currentUser);
// }
//
// // function makeUsers(array) { *** dont need to instantiate 50 users on page load??? *****
// //   userData.forEach(function(dataItem) {
// //     let user = new User(dataItem);
// //     array.push(user);
// //   })
// // }
//
// function pickUser() { *** we have this method in domUpdates ***
//   return Math.floor(Math.random() * 50);
// }
//
// function getUserById(id, listRepo) { ****  ****
//   return listRepo.getDataFromID(id);
// };
//
//


// function addInfoToSidebar(user, userRepo) { **** Moved over to domUpdates
//   sidebarName.innerText = user.name;
//   headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
//   stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
//   avStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
//   userAddress.innerText = user.address;
//   userEmail.innerText = user.email;
//   userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
//   friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userRepo))
// }; ***


//
// function makeFriendHTML(user, userStorage) { *** Done Done DID IT
//   return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
// } ***

// function makeWinnerID(activityInfo, user, dateString, userStorage){
//   return activityInfo.getWinnerId(user, dateString, userStorage)
// }**DONE!**

// function makeToday(userRepo, currentUserID, hydrationData) {
//   var sortedArray = userRepo.makeSortedUserArray(currentUserID, hydrationData);
//   return sortedArray[0].date;
//   makeRandomDate(userRepo, currentUserID, hydrationData);
// }**Already doing this with findMostCurrentDate in domUpdates**
//

// function makeRandomDate(userStorage, id, dataSet) {
//   var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
//   return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
//
// }

//
// function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
//   hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>`);
//   hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>`)
//   hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
//   hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
// }
//
// function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
//   return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
// }
//
// function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
//   sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
//   sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
//   avUserSleepQuality.insertAdjacentHTML("afterBegin", `<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100}</span></p><p>out of 5.</p>`);
//   sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
//   sleepEarlierWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
// }
//
// function makeSleepHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
// }
//
// function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
// }
//


// function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
//   userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
//
//   avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
//
//   userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`)
//
//   avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
//
//   userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)
//
//   avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
//
//   userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps")));
//
//   userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")));
//
//   userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")));
//
//   bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")));
// }
//
// function makeStepsHTML(id, activityInfo, userStorage, method) {
//   return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
// }
//
// function makeStairsHTML(id, activityInfo, userStorage, method) {
//   return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
// }
//
// function makeMinutesHTML(id, activityInfo, userStorage, method) {
//   return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
// }
//
// function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
//   friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
//   streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
//   friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
// }
//
// function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
//   return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
// }
//
// function makeStepStreakHTML(id, activityInfo, userStorage, method) {
//   return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
// }
//
// startApp();
