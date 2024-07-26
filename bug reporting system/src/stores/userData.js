import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    users: [
      {
        username: 'admin',
        fullname: 'Siddesh Pednekar',
        email: 'admin@example.com',
        phone: '1234567890',
        password: 'admin123',
        designation: 'admin',
        userid: '1'
      },
      {
        username: 'user1',
        fullname: 'Siddesh Pednekar',
        email: 'user1@example.com',
        phone: '9876543210',
        password: 'user1',
        designation: 'user',
        userid: '2'
      },
      {
        username: 'user2',
        fullname: 'Regular User 2',
        email: 'user2@example.com',
        phone: '5555555555',
        password: 'user2',
        designation: 'user',
        userid: '3'
      },
      {
        username: 'tester2',
        fullname: 'Regular User 2',
        email: 'user2@example.com',
        phone: '5555555555',
        password: 'tester2',
        designation: 'tester',
        userid: '7'
      },
      {
        username: 'tester1',
        fullname: 'siddesh Pednekar',
        email: 'tester1@example.com',
        phone: '6666666666',
        password: 'tester1',
        designation: 'tester',
        userid: '4'
      },
      {
        username: 'developer1',
        fullname: 'Developer One',
        email: 'developer1@example.com',
        phone: '7777777777',
        password: 'developer1',
        designation: 'developer',
        userid: '5'
      },
      {
        username: 'developer2',
        fullname: 'Developer Two',
        email: 'developer2@example.com',
        phone: '8888888888',
        password: 'developer2',
        designation: 'developer',
        userid: '6'
      }
    ]
  }),

  getters: {
    getUserByEmail: (state) => (email) => {
      return state.users.find(user => user.email === email);
    },
    getDevelopers: (state) => {
      return state.users.filter(user => user.designation === 'developer');
    }
  },
  actions: {
    addUser(newUser) {
      this.users.push(newUser);
    },
    display() {
      console.log(this.users);
    }
  }
});
