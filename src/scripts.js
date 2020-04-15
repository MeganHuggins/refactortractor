import './css/style.scss';
import domUpdates from './domUpdates';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';

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



// function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
//   friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));

//   streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));

//   streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
//
// friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));

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
