import $ from 'jquery';
import moment from 'moment';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';


let userRepo, currentUser, activity, todaysDate, winnerID,  hydration, sleep, formattedDate;

const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {
    todaysDate = domUpdates.findMostCurrentDate(activityData);
    currentUser = domUpdates.findRandomUser(users);
    userRepo = new UserRepo(users, currentUser);
    activity = new Activity(activityData);
    hydration = new Hydration(hydrationData, userRepo);
    userRepo.getDataFromPastWeek(hydrationData);
    domUpdates.addInfoToSidebar(userRepo);

    hydration = new Hydration(hydrationData);
    sleep = new Sleep(sleepData);
    domUpdates.addSleepInfo();
    $('#submit-new-activity-button').click((e) => domUpdates.postNewActivityForm(e));
    domUpdates.addActivityInfo(activityData);
    domUpdates.addHydrationInfo(hydrationData);
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
    $('#sidebarName').text(currentUser.name);
    $('#headerText').text(`${currentUser.getFirstName()}'s Activity Tracker`);
    $('#stepGoalCard').text(`Your daily step goal is ${currentUser.dailyStepGoal}.`);
    avStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
    $('#userAddress').text(currentUser.address);
    $('#userEmail').text(currentUser.email);
    $('#userStridelength').text(`Your stridelength is ${currentUser.strideLength} meters.`);
    $('#friendList').append(domUpdates.makeFriendHTML(userRepo));
  },

  makeFriendHTML: (userRepo) => {
    let friends = currentUser.getFriendsNames(userRepo);
    return friends.map(friend => `<li class='historical-list-listItem'>${friend}</li>`).join('');
  },

//   makeWinnerID: (activityData) => {
//     let mostCurrentDateInDataSet = domUpdates.findMostCurrentDate(activityData);
//     let weiner = activity.getWinnerId(currentUser, mostCurrentDateInDataSet, userRepo);
//   },

  addSleepInfo: () => {
    const formattedDate = moment('2020/01/16', 'YYYY-MM-DD').format('MMM Do YYYY');
    const currentUserSleepData = userRepo.getDataSetForUser(sleep.sleepData);
    const hoursSlept = sleep.calculateDailySleep(currentUser, '2020/01/16');
    const sleepQualityToday = sleep.calculateDailySleepQuality(currentUser, '2020/01/16');

    !hoursSlept ?
      $('#sleepToday').append(`<p>We have no sleep data for you ${formattedDate}</p>`) :
        $('#sleepToday').append(`
          <p>You slept <span class="number">${hoursSlept}</span> hours ${formattedDate}.</p>
        `);
    !sleepQualityToday ?
      $('#sleepQualityToday').append(`<p>We have no sleep data for you ${formattedDate}</p>`) :
        $('#sleepQualityToday').append(`<p>Your sleep quality was <span class="number">${sleepQualityToday}</span> out of 5.</p>`);

    $('#sleepThisWeek').append(domUpdates.makeSleepHTML(sleep.calculateWeekSleep(currentUserSleepData, currentUser, userRepo)));
  },

  makeSleepHTML: (method) => {
    formattedDate = moment('2020/01/16', 'YYYY-MM-DD').format('MMM Do YYYY');
    return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
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
    let winnerID = parseInt(activity.getWinnerId(currentUser, todaysDate, userRepo));
    let winnerInfo = userRepo.users.find(user => user.id === winnerID);
    return winnerInfo.name
  },

  addActivityInfo: (activityData) => {
    $('#userStairsToday').prepend(`<p>Stair Count:</p><p>You</><p><span class="number">${activity.userDataForToday(activityData, '2020/01/22', currentUser.id, 'flightsOfStairs')}</span></p>`);

    $('#avgStairsToday').prepend(`<p>Stair Count: </p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(activityData, todaysDate, userRepo, 'flightsOfStairs')}</span></p>`);

    $('#userStepsToday').prepend(`<p>Step Count:</p><p>You</p><p><span class="number">${activity.userDataForToday(activityData, '2020/01/22', currentUser.id, 'numSteps')}</span></p>`);

    $('#avgStepsToday').prepend(`<p>Step Count:</p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(activityData, todaysDate, userRepo, 'numSteps')}</span></p>`);

    $('#userMinutesToday').prepend(`<p>Active Minutes:</p><p>You</p><p><span class="number">${activity.userDataForToday(activityData, '2020/01/22', currentUser.id, 'minutesActive')}</span></p>`);

    $('#avgMinutesToday').prepend(`<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(activityData, todaysDate, userRepo, 'minutesActive')}</span></p>`);

    $('#userStepsThisWeek').prepend(domUpdates.makeActivitiesHTML(activityData, userRepo, userRepo.getDataFromPastWeek(activityData, todaysDate), 'numSteps'));

    $('#userStairsThisWeek').prepend(domUpdates.makeActivitiesHTML(activityData, userRepo, userRepo.getDataFromPastWeek(activityData, todaysDate), 'flightsOfStairs'));

    $('#userMinutesThisWeek').prepend(domUpdates.makeActivitiesHTML(activityData, userRepo, userRepo.getDataFromPastWeek(activityData, todaysDate), 'minutesActive'));

    $('#bestUserSteps').prepend(domUpdates.makeWinnerHTML(domUpdates.makeWinnerName(activityData, userRepo)));
  },

  makeHydrationHTML: (currentUserID, hydration, userRepo, weeklyFluids) => {
    return weeklyFluids.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}</li>`).join('');
  },

  addHydrationInfo: (id, hydrationData, dateString, userStorage, laterDateString) => {

   $('#hydrationToday').prepend(`<p>You drank</p><p><span class="number">${hydration.calculateDailyOunces(currentUser.id, '2020/01/22')}</span></p><p>oz water today.</p>`);

   $('#hydrationAverage').prepend(`<p>Your average water intake is</p><p><span class="number">${hydration.calculateAverageOunces(currentUser.id)}</span></p> <p>oz per day.</p>`)

   $('#hydrationThisWeek').prepend(domUpdates.makeHydrationHTML(currentUser.id, hydration, userRepo, hydration.showEntireWeeksFluidConsumption(userRepo, currentUser.id)));

 },

  // addFriendGameInfo: (activityData) => {
  //   friendChallengeListToday.insertAdjacentHTML("afterBegin", domUpdates.makeFriendChallengeHTML(activityData, userRepo, activity.showChallengeListAndWinner(currentUser, todaysDate, userRepo, activityData)));
  // },

  postNewActivityForm: (e) => {
    e.preventDefault();
    const dateInput = $('#calendar').val();
    const numOuncesInput = parseInt($('#hydration-ounces').val());
    const numStepsInput = parseInt($('#num-steps').val());
    const minutesActiveInput = parseInt($('#min-active').val());
    const flightsOfStairsInput = parseInt($('#flights-stairs').val());
    const hoursSleepInput = parseInt($('#sleep-hours').val());
    const sleepQualityInput = parseInt($('#sleep-quality').val());
    formattedDate = moment(dateInput, 'YYYY-MM-DD').format('YYYY/MM/DD');

    if (dateInput && numOuncesInput) {
      domUpdates.postNewhydration(dateInput, numOuncesInput);
    };

    if (dateInput && numStepsInput && minutesActiveInput && flightsOfStairsInput) {
      domUpdates.postNewSteps(dateInput, numStepsInput, minutesActiveInput, flightsOfStairsInput);
    };

    if (dateInput && hoursSleepInput && sleepQualityInput) {
      domUpdates.postNewSleep(dateInput, hoursSleepInput, sleepQualityInput);
    };
  },

  postNewhydration: (dateInput, numOuncesInput) => {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": currentUser.id,
        "date": formattedDate,
        "numOunces": numOuncesInput
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`There was an error: ${error}`));
  },

  postNewSteps: (dateInput, numStepsInput, minutesActiveInput, flightsOfStairsInput) => {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": currentUser.id,
        "date": formattedDate,
        "numSteps": numStepsInput,
        "minutesActive": minutesActiveInput,
        "flightsOfStairs": flightsOfStairsInput
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`There was an error: ${error}`));
  },

  postNewSleep: (dateInput, hoursSleepInput, sleepQualityInput) => {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "userID": currentUser.id,
          "date": formattedDate,
          "hoursSlept": hoursSleepInput,
          "sleepQuality": sleepQualityInput
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`There was an error: ${error}`));
  },
}

export default domUpdates;
