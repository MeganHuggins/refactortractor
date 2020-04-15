import $ from 'jquery';
import moment from 'moment';
import User from './User';
import UserRepo from './UserRepo';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';

let userRepo, currentUser, activity, mostCurrentDateInDataSet, hydration, sleep, formattedDate;

const domUpdates = {
  loadPage: (users, sleepData, activityData, hydrationData) => {

    mostCurrentDateInDataSet = domUpdates.findMostCurrentDate(hydrationData);
    currentUser = domUpdates.findRandomUser(users);
    domUpdates.findMostCurrentDate(hydrationData);
    userRepo = new UserRepo(users, currentUser, mostCurrentDateInDataSet);
    activity = new Activity(activityData);
    userRepo.getDataFromPastWeek(hydrationData);
    domUpdates.addInfoToSidebar(userRepo);
    domUpdates.populateLastWeeksData();
    hydration = new Hydration(hydrationData);
    sleep = new Sleep(sleepData);
    domUpdates.addSleepInfo();
    $('#submit-new-activity-button').click((e) => domUpdates.postNewActivityForm(e));
  },

  findRandomUser: (users) => {
    for (let i = users.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * (i + 1));
      [users[i], users[n]] = [users[n], users[i]];
    }
    return new User(users[0]);
  },

  findMostCurrentDate: (dataSet) => {
    let sortedData = dataSet.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    return sortedData[sortedData.length - 1].date;
  },

  populateLastWeeksData: () => {
    $('.historicalWeek').each((index, value) => {
      $(value).append(`Week of ${mostCurrentDateInDataSet}`);
    });
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

  makeWinnerID: (activityData) => {
    let mostCurrentDateInDataSet = domUpdates.findMostCurrentDate(activityData);
    let weiner = activity.getWinnerId(currentUser, mostCurrentDateInDataSet, userRepo);
  },

  addSleepInfo: () => {
    const formattedDate = moment('2020/01/16', 'YYYY-MM-DD').format('MMM Do YYYY');
    const currentUserSleepData = userRepo.getDataSetForUser(sleep.sleepData);
    const hoursSlept = sleep.calculateDailySleep(currentUserSleepData, '2020/01/16');
    const sleepQualityToday = sleep.calculateDailySleepQuality(currentUserSleepData, '2020/01/16');

    !hoursSlept ?
      $('#sleepToday').append(`<p>We have no sleep data for you ${formattedDate}</p>`) :
        $('#sleepToday').append(`
          <p>You slept <span class="number">${hoursSlept}</span> hours ${formattedDate}.</p>
        `);

    !sleepQualityToday ?
      $('#sleepQualityToday').append(`<p>We have no sleep data for you ${formattedDate}</p>`) :
        $('#sleepQualityToday').append(`<p>Your sleep quality was <span class="number">${sleepQualityToday}</span> out of 5.</p>`);

    $('#sleepThisWeek').append(domUpdates.makeSleepHTML(sleep.calculateWeekSleep(currentUserSleepData, userRepo)));
  },

  makeSleepHTML: (method) => {
    formattedDate = moment('2020/01/16', 'YYYY-MM-DD').format('MMM Do YYYY');
    return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  },

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
