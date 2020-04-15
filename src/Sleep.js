
class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  calculateDailySleep(userSleepData, date) {
    let findSleepByDate = userSleepData.find(data => date === data.date);
    return !findSleepByDate ?
      findSleepByDate :
        findSleepByDate.hoursSlept;
  }

  calculateDailySleepQuality(userSleepData, date) {
    let findSleepQualityByDate = userSleepData.find(data => date === data.date);

    return !findSleepQualityByDate ?
      findSleepQualityByDate :
        findSleepQualityByDate.sleepQuality;
  }

  calculateWeekSleep(userSleepData, userRepo) {
    return userRepo.getDataFromPastWeek(userSleepData).map(data => `${data.date}: ${data.hoursSlept}`);
  }

  calculateDailySleep(user, date) {
    let findSleepByDate = this.sleepData.find((data) => user.id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }
  calculateDailySleepQuality(user, date) {
    let findSleepQualityByDate = this.sleepData.find((data) => user.id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }

}


export default Sleep;
