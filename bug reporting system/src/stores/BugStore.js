// bugStore.js

import { defineStore } from 'pinia';

export const useBugStore = defineStore({
  id: 'bugStore',
  state: () => ({
    bugs: [],
  }),
  actions: {
    // Add a new bug report
    addBug(bug) {
      this.bugs.push(bug);
    },

    // Get all bug reports
    getBugs() {
      return this.bugs;
    },

    // Update an existing bug report
    updateBug(updatedBug) {
      const index = this.bugs.findIndex(bug => bug.id === updatedBug.id);
      if (index !== -1) {
        this.bugs.splice(index, 1, updatedBug);
      }
    },
  },
});
