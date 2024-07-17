import { defineStore } from 'pinia';

export const useBugStore = defineStore({
  id: 'bugStore',
  state: () => ({
    bugs: [
      {
        id: '1',
        title: 'Login page not responsive',
        description: 'The login page does not scale properly on mobile devices.',
        status: 'reported',
        reportedBy: 'Tester',
        createdAt: new Date('2023-06-15T09:00:00Z'),
        deadline: null,
        assignedTo: 'dev1'
      },
      {
        id: '2',
        title: 'Error 500 on data export',
        description: 'Exporting data as CSV throws a server error 500.',
        status: 'in-progress',
        reportedBy: 'Tester',
        createdAt: new Date('2023-06-18T14:30:00Z'),
        deadline: null,
        assignedTo: 'dev1'
      },
      {
        id: '3',
        title: 'Profile picture upload fails',
        description: 'Uploading a profile picture results in a failure with no error message.',
        status: 'resolved',
        reportedBy: 'Tester',
        createdAt: new Date('2023-06-20T12:45:00Z'),
        deadline: null,
        assignedTo: 'dev1'
      },
      {
        id: '4',
        title: 'Notifications not received',
        description: 'Users are not receiving email notifications for new messages.',
        status: 'reported',
        reportedBy: 'Tester',
        createdAt: new Date('2023-07-01T08:15:00Z'),
        deadline: null,
        assignedTo: 'dev1'
      },
      {
        id: '5',
        title: 'Dark mode toggle not working',
        description: 'Switching to dark mode has no effect.',
        status: 'in-progress',
        reportedBy: 'Tester',
        createdAt: new Date('2023-07-03T17:00:00Z'),
        deadline: null,
        assignedTo: 'dev1'
      },
    ],
  }),
  actions: {
    addBug(bug) {
      this.bugs.push(bug);
    },

    getBugs() {
      return this.bugs;
    },

    assignBug(bugId, developerId) {
      const bug = this.bugs.find(b => b.id === bugId);
      if (bug) {
        bug.assignedTo = developerId;
      }
    },

    setDeadline(bugId, deadline) {
      const bug = this.bugs.find(b => b.id === bugId);
      if (bug) {
        bug.deadline = deadline;
      }
    },

    updateBug(updatedBug) {
      const index = this.bugs.findIndex(bug => bug.id === updatedBug.id);
      if (index !== -1) {
        this.bugs.splice(index, 1, updatedBug);
      }
    },

    resolveBug(bugId) {
      const bug = this.bugs.find(b => b.id === bugId);
      if (bug) {
        bug.status = 'resolved';
        bug.resolvedAt = new Date();
      }
    },

    deleteBug(bugId) {
      const index = this.bugs.findIndex(bug => bug.id === bugId);
      if (index !== -1) {
        this.bugs.splice(index, 1);
      }
    },
  },
});
