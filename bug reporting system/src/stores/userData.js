import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    users: [
      {
        username: 'admin',
        fullname: 'Siddesh Pednekar',
        email: 'admin@example.com',
        phone: '1234567890',
        password:'admin123',
        designation: 'admin',
      },
      {
        username: 'user1',
        fullname: 'Siddesh Pednekar',
        email: 'user1@example.com',
        phone: '9876543210',
        password:'user1',
        designation: 'user',
        userid: '2'
      },
      {
        username: 'user2',
        fullname: 'Regular User 2',
        email: 'user2@example.com',
        phone: '5555555555',
        password:'user2',
        designation: 'user',
        userid: '3'
      }
    ]
  }),

  getters: {
    getUserByEmail: (state) => (email) => {
      return state.users.find(user => user.email === email);
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