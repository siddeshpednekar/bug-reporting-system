<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h1 style="text-align:center;font-weight:bolder;font-size:2rem;">Completed Bug List</h1>
      <div v-for="bug in reportedBugs" :key="bug.id" class="q-my-md">
        <q-card>
          <q-card-section>
            <div class="text-h6" style="font-weight:bolder;">{{ bug.title }}</div>
            <div >{{ bug.description }}</div>
            <div class="q-mt-md">
            <div  style="display:flex;align-items:center;">
            <div style="font-weight:bold;">Status: </div>
              <q-chip :color="getStatusColor(bug.status)" text-color="white" outlined>
                {{ bug.status }}
              </q-chip>
              </div>
              <div class="q-mt-sm"><span style="font-weight:bold;">Reported By: </span>{{ bug.reportedBy }}</div>
              <div><span style="font-weight:bold;">Created At: </span>{{ bug.createdAt }}</div>
              <div><span style="font-weight:bold;">Severity: </span>{{ bug.severity }}</div>
              <div><span style="font-weight:bold;">Fixed By: </span>{{ bug.assignedTo }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      
      <!-- Edit Bug Dialog -->
      <q-dialog v-model="editBugDialog" persistent>
        <q-card class="edit-bug-dialog">
          <q-card-section class="q-pt-none q-px-lg">
            <div class="q-card-main">
              <div class="text-h6">Edit Bug</div>
              <q-btn icon="close" flat round @click="editBugDialog = false" class="q-mr-sm" />
            </div>
            <q-form @submit="updateBug">
              <q-input v-model="editedBug.title" label="Title" outlined dense />
              <q-input v-model="editedBug.description" label="Description" outlined dense />
              <q-select
                v-model="editedBug.status"
                :options="statusOptions"
                label="Status"
                outlined
                dense
              />
              <q-input v-model="editedBug.reportedBy" label="Reported By" outlined dense />
              <q-date v-model="editedBug.createdAt" label="Created At" outlined dense />
              <div class="q-mt-md q-gutter-md">
                <q-btn type="submit" color="primary" label="Update" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Set Deadline Dialog -->
      <q-dialog v-model="setDeadlineDialog" persistent>
        <q-card class="set-deadline-dialog">
          <q-card-section class="q-pt-none q-px-lg">
            <div class="q-card-main">
              <div class="text-h6">Set Deadline</div>
              <q-btn icon="close" flat round @click="setDeadlineDialog = false" class="q-mr-sm" />
            </div>
            <q-form @submit="updateDeadline">
              <q-date v-model="deadline" label="Deadline" outlined dense />
              <div class="q-mt-md q-gutter-md">
                <q-btn type="submit" color="primary" label="Set Deadline" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Assign Developer Dialog -->
      <q-dialog v-model="assignDeveloperDialog" persistent>
        <q-card class="assign-developer-dialog">
          <q-card-section class="q-pt-none q-px-lg">
            <div class="q-card-main">
              <div class="text-h6">Assign Developer</div>
              <q-btn icon="close" flat round @click="assignDeveloperDialog = false" class="q-mr-sm" />
            </div>
            <q-form @submit="updateAssignment">
              <q-select
                v-model="selectedDeveloper"
                :options="developerOptions"
                label="Select Developer"
                outlined
                dense
              />
              <div class="q-mt-md q-gutter-md">
                <q-btn type="submit" color="primary" label="Assign" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { useBugStore } from '../stores/BugStore';
import { useDataStore } from '../stores/userData';

export default {
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 5,
      },
      columns: [
        { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
        { name: 'description', label: 'Description', align: 'left', field: 'description', sortable: true },
        { name: 'status', label: 'Status', align: 'center', field: 'status', sortable: true },
        { name: 'reportedBy', label: 'Reported By', align: 'center', field: 'reportedBy', sortable: true },
        { name: 'createdAt', label: 'Created At', align: 'center', field: 'createdAt', sortable: true },
        { name: 'severity', label: 'Severity', align: 'center', field: 'severity', sortable: true },
        { name: 'assignedTo', label: 'Fixed By', align: 'center', field: 'assignedTo', sortable: true }
      ],
      statusOptions: [
        { label: 'Reported', value: 'reported' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' }
      ],
      editBugDialog: false,
      setDeadlineDialog: false,
      assignDeveloperDialog: false,
      selectedBugId: '',
      deadline: '',
      editedBug: {
        id: '',
        title: '',
        description: '',
        status: '',
        reportedBy: '',
        createdAt: '',
        severity: ''
      },
      selectedDeveloper: ''
    };
  },
  computed: {
    bugs() {
      const bugStore = useBugStore();
      return bugStore.bugs;
    },
    reportedBugs() {
      return this.bugs.filter(bug => bug.status === 'resolved');
    },
    developerOptions() {
      const dataStore = useDataStore();
      return dataStore.users
        .filter(user => user.designation === 'developer')
        .map(dev => ({ label: dev.fullname, value: dev.username }));
    }
  },
  methods: {
    getStatusColor(status) {
      switch (status) {
        case 'reported':
          return 'red';
        case 'in-progress':
          return 'orange';
        case 'resolved':
          return 'green';
        default:
          return 'grey';
      }
    },
    editBug(bug) {
      this.editedBug = { ...bug };
      this.editBugDialog = true;
    },
    updateBug() {
      const bugStore = useBugStore();
      bugStore.updateBug(this.editedBug);
      console.log(`Bug ${this.editedBug.id} updated`);
      this.editBugDialog = false;
    },
    assignBug(bug) {
      this.selectedBugId = bug.id;
      this.selectedDeveloper = '';
      this.assignDeveloperDialog = true;
    },
    updateAssignment() {
      const bugStore = useBugStore();
      bugStore.assignBug(this.selectedBugId, this.selectedDeveloper);
      console.log(`Bug ${this.selectedBugId} assigned to developer ${this.selectedDeveloper}`);
      this.assignDeveloperDialog = false;
    },
    setDeadline(bug) {
      this.selectedBugId = bug.id;
      this.deadline = '';
      this.setDeadlineDialog = true;
    },
    updateDeadline() {
      const bugStore = useBugStore();
      bugStore.setDeadline(this.selectedBugId, this.deadline);
      console.log(`Deadline set for bug ${this.selectedBugId}: ${this.deadline}`);
      this.setDeadlineDialog = false;
    },
    deleteBug(bug) {
      const bugStore = useBugStore();
      bugStore.deleteBug(bug.id);
      console.log(`Bug ${bug.id} deleted`);
    }
  },
};
</script>
<style scoped>
.q-header,
.q-drawer {
  background-color: #1a1a1a;
  color: white;
}

.q-avatar img {
  border-radius: 50%;
}

.q-chip {
  margin-right: 8px;
}

.q-btn {
  margin-right: 8px;
}

.q-dialog .q-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.q-dialog .q-card-section {
  padding: 20px;
}

.q-dialog .q-card-title {
  font-weight: 500;
}

.q-card-main {
  display: flex;
  justify-content: space-between;
}

.q-dialog .q-btn {
  min-width: auto;
  padding: 8px;
}

.q-dialog .q-input,
.q-dialog .q-select,
.q-dialog .q-date {
  margin-bottom: 10px;
}

.q-dialog .q-mt-md {
  margin-top: 20px;
}

.q-dialog .q-gutter-md {
  margin-left: -8px;
  margin-right: -8px;
}

.q-dialog .q-btn[type="submit"] {
  margin-top: 10px;
}
</style>
