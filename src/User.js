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
  };

  getFriendsNames(userRepo) {
    let friendsNames = [];
    this.friends.forEach(friend => {
      userRepo.users.find(user => {
        if(friend === user.id) {
          friendsNames.push(user.name);
        }
      })
    })
    return friendsNames;
  };

}


export default User;
