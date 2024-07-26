<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h1 class="page-title">Pending Bug List</h1>
      <div class="q-gutter-md">
        <q-card v-for="bug in sortedReportedBugs" :key="bug.id" class="q-pa-md">
          <q-item>
            <q-item-section>
              <q-item-label><strong>Title:</strong> {{ bug.title }}</q-item-label>
              <q-item-label><strong>Description:</strong> {{ bug.description }}</q-item-label>
              <q-item-label><strong>Reported by:</strong> {{ bug.reportedBy }}</q-item-label>
              <q-item-label>
                <strong>Status:</strong>
                <q-chip :color="getStatusColor(bug.status)" text-color="black" outlined>
                  {{ bug.status }}
                </q-chip>
              </q-item-label>
              <q-item-label>
                <strong>Severity:</strong>
                <q-chip :color="getSeverityColor(bug.severity)" text-color="white" outlined>
                  {{ bug.severity }}
                </q-chip>
              </q-item-label>
              <q-item-label><strong>Deadline:</strong> {{ bug.deadline }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="edit" color="primary" @click="editBug(bug)" class="q-mr-sm">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="assignment" color="amber" @click="assignBug(bug)" class="q-mr-sm">
                <q-tooltip>Assign</q-tooltip>
              </q-btn>
              <q-btn icon="schedule" color="blue" @click="setDeadline(bug)" class="q-mr-sm">
                <q-tooltip>Set Deadline</q-tooltip>
              </q-btn>
              <q-btn icon="delete" color="negative" @click="deleteBug(bug)" class="q-mr-sm">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
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
              <q-select v-model="editedBug.status" :options="statusOptions" label="Status" outlined dense />
              <q-select v-model="editedBug.severity" :options="severityOptions" label="Severity" outlined dense />
              <q-input v-model="editedBug.reportedBy" label="Reported By" outlined dense />
              <div class="btn">
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
              <div class="btn">
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
              <q-select v-model="selectedDeveloper" :options="developerOptions" label="Select Developer" :rules="[val => !!val || 'developer is required']" outlined dense />
              <div class="btn">
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
import { mapState } from 'pinia';

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
        { name: 'severity', label: 'Severity', align: 'center', field: 'severity', sortable: true },
        { name: 'deadline', label: 'Deadline', align: 'center', field: 'deadline', sortable: true },
        { name: 'actions', label: 'Actions', align: 'center' }
      ],
      statusOptions: [
        { label: 'Reported', value: 'reported' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' }
      ],
      severityOptions: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
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
        severity: '',
        reportedBy: '',
        createdAt: ''
      },
      selectedDeveloper: ''
    };
  },
  computed: {
  ...mapState(useBugStore, ['bugs']),
  reportedBugs() {
    return this.bugs.filter(bug => bug.status === 'reported' || bug.status === 'in-progress');
  },
  sortedReportedBugs() {
    return [...this.reportedBugs].sort((a, b) => this.severityValue(b.severity) - this.severityValue(a.severity));
  }
},
  methods: {
    getStatusColor(status) {
      switch (status) {
        case 'reported':
          return 'yellow';
        case 'in-progress':
          return 'purple';
        case 'resolved':
          return 'black';
        default:
          return 'indigo';
      }
    },
     getSeverityColor(severity) {
      switch (severity) {
        case 'low':
          return 'green';
        case 'medium':
          return 'orange';
        case 'high':
          return 'red';
        default:
          return 'grey';
      }
    },
    severityValue(severity) {
      switch (severity) {
        case 'low':
          return 1;
        case 'medium':
          return 2;
        case 'high':
          return 3;
        default:
          return 0;
      }
    },
    editBug(bug) {
      this.editedBug = { ...bug };
      this.editBugDialog = true;
    },
  updateBug() {
    const bugStore = useBugStore();
    let status = this.editedBug.status;
    let severity = this.editedBug.severity;
    this.editedBug.status = status.value || status;
    this.editedBug.severity = severity.value || severity;

    bugStore.updateBug(this.editedBug);
    this.editBugDialog = false;
    this.$q.notify({
      message: `Bug ${this.editedBug.id} updated`,
      color: 'positive',
      position: 'top',
    });
  },
    assignBug(bug) {
      this.selectedBugId = bug.id;
      this.selectedDeveloper = '';
      this.assignDeveloperDialog = true;
    },
    updateAssignment() {
      const bugStore = useBugStore();
      bugStore.assignBug(this.selectedBugId, this.selectedDeveloper.value);
      console.log(`Bug ${this.selectedBugId} assigned to developer ${this.selectedDeveloper.value}`);
      this.assignDeveloperDialog = false;
      this.$q.notify({
        message: `Bug ${this.selectedBugId} assigned to developer ${this.selectedDeveloper.value}`,
        color: 'positive',
        position: 'top',
      });
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
      this.$q.notify({
        message: `Deadline set for bug ${this.selectedBugId}: ${this.deadline}`,
        color: 'positive',
        position: 'top',
      });
    },
    deleteBug(bug) {
      const bugStore = useBugStore();
      bugStore.deleteBug(bug.id);
      console.log(`Bug ${bug.id} deleted`);
      this.$q.notify({
        message: `Bug ${bug.id} deleted`,
        color: 'negative',
        position: 'top',
      });
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

.page-title {
  text-align: center;
  font-weight: bolder;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.q-table {
  width: 100%;
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
  align-items: center;
}

.q-dialog .q-btn {
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
.btn{
  display:flex;
  justify-content:center;
  align-items:center;
}

@media (max-width: 768px) {
  .q-table {
    display: block;
    overflow-x: auto;
  }
  .q-card-main {
    align-items: flex-start;
  }
  .page-title {
    font-size: 1.5rem;
  }
  .q-dialog .q-card-section {
    padding: 10px;
  }
  .q-dialog .q-btn[type="submit"] {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.2rem;
  }
  .q-dialog .q-card {
    margin: 0 auto;
  }
  .q-dialog .q-card-section {
    padding: 5px;
  }
}
<style scoped>
.q-tooltip {
  font-size: 0.75rem; /* Adjust font size */
}
</style>

