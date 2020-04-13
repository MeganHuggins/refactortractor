class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }
  calculateAverageOunces(id) {
    let foundHydrationDataById = this.hydrationData.filter((data) => id === data.userID);
    return foundHydrationDataById.reduce((totalOzConsumed, currentDay) => {
      return totalOzConsumed += currentDay.numOunces;
    }, 0) / foundHydrationDataById.length;
  }
  calculateDailyOunces(id, date) {
    let foundOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    return foundOuncesByDate.numOunces;
  }
  //have this method on userRepo
  showEntireWeeksFluidConsumption(userRepo, id) {
    let mostRecentWeekOfHydration = userRepo.getDataFromPastWeek(this.hydrationData);
    return mostRecentWeekOfHydration.map(currentDay => `${currentDay.date}: ${data.numOunces}`);
    // return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
  // calculateRandomWeekOunces(date, id, userRepo) {
  //   return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  // }-------I DO NOT THINK THAT WE WANT A RANDOM WEEK!!!!!
}


export default Hydration;
