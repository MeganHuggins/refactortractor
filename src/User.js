class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.sleepData = null;
    this.activityData = null;
    this.hydrationData = null;

  };
  getFirstName() {
    return this.name.split(' ', 1).join();
  }
  getFriendsNames(userRepo) {
    return this.friends.map(friend => userRepo.getDataSetForUser(this.friends).name);
  }
}


export default User;
