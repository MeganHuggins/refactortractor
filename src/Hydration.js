class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  calculateAverageOunces(id) {
    let foundHydrationDataById = this.hydrationData.filter((data) => id === data.userID);
    let totalFluidConsumedAllTime = foundHydrationDataById.reduce((totalOzConsumed, currentDay) => {
      totalOzConsumed += currentDay.numOunces;
      return totalOzConsumed;
    }, 0);
    return Math.round(totalFluidConsumedAllTime / foundHydrationDataById.length);
  }

  calculateDailyOunces(id, date) {
    let foundOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    console.log('found', foundOuncesByDate);
    return foundOuncesByDate.numOunces;
  }

  showEntireWeeksFluidConsumption(userRepo, id) {
    let mostRecentWeekOfHydration = userRepo.getDataFromPastWeek(this.hydrationData);
    let weekByDateAndOz = mostRecentWeekOfHydration.map(currentDay => `${currentDay.date}: ${currentDay.numOunces} oz consumed`);
    return weekByDateAndOz;
  }
}

export default Hydration;
