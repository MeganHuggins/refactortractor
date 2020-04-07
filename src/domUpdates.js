import $ from 'jquery';

const domUpdates = {

  loadPage: (users, sleep, activity, hydration) => {
    console.log('in domUpdates: ', users, sleep, activity, hydration);
    domUpdates.findRandomUser(users);
  },

  findRandomUser: (users) => {

    for (let i = users.length - 1; i > 0; i--) {
      let n = Math.floor(Math.random() * (i + 1));
      [users[i], users[n]] = [users[n], users[i]];
    }
    return users[0];

  },


}

export default domUpdates;
