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
