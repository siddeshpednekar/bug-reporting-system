<template>
  <q-page class="q-pa-md dark">
    <div class="developer-content">
      <h1 class="intro-title">Developer Dashboard</h1>
      <p class="intro-text">
        View and manage your assigned bugs. Update the status as you work on them.
      </p>

      <div class="filter-section">
        <q-select
          v-model="selectedStatus"
          :options="statusOptions"
          label="Filter by Status"
          outlined
          dense
        />
      </div>

      <div class="bug-list">
        <q-table
          :rows="filteredBugs"
          :columns="columns"
          row-key="id"
          flat
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn icon="check_circle" color="positive" @click="openStatusDialog(props.row)" />
            </q-td>
          </template>
        </q-table>
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
              <div class="q-mt-md q-gutter-md">
                <q-btn type="submit" color="primary" label="Save" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Change Status Dialog -->
      <q-dialog v-model="statusDialog" persistent transition-show="slide-up" transition-hide="slide-down">
        <q-card class="status-dialog">
          <q-card-section class="q-pt-none q-px-lg">
            <div class="q-card-main">
              <div class="text-h6">Change Bug Status</div>
              <q-btn icon="close" flat round @click="statusDialog = false" class="q-mr-sm" />
            </div>
            <q-select
              v-model="selectedStatusValue"
              :options="statusChangeOptions"
              label="Select Status"
              outlined
              dense
            />
            <div class="q-mt-md q-gutter-md">
              <q-btn color="primary" label="Save" @click="changeStatus" />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBugStore } from '../stores/BugStore';

export default defineComponent({
  setup() {
    const route = useRoute();
    const bugStore = useBugStore();
    const developerId = ref(null); 
    const editBugDialog = ref(false);
    const statusDialog = ref(false);
    const editedBug = ref({});
    const selectedStatus = ref('');
    const selectedStatusValue = ref('');

    const statusOptions = [
      { label: 'All', value: '' },
      { label: 'Reported', value: 'reported' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Resolved', value: 'resolved' },
    ];

    const statusChangeOptions = [
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Resolved', value: 'resolved' },
    ];

    onMounted(() => {
      developerId.value = route.query.username || 'defaultDeveloperId'; // Replace 'defaultDeveloperId' with an appropriate default value
      console.log(developerId.value);
    });

    const assignedBugs = computed(() => bugStore.bugs.filter(bug => bug.assignedTo === developerId.value));

    const filteredBugs = computed(() => {
      if (selectedStatus.value.value) {
        return assignedBugs.value.filter(bug => bug.status === selectedStatus.value.value);
      }
      return assignedBugs.value;
    });

    const columns = [
      { name: 'title', label: 'Title', align: 'left', field: 'title', sortable: true },
      { name: 'description', label: 'Description', align: 'left', field: 'description', sortable: true },
      { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
      { name: 'deadline', label: 'Deadline', align: 'left', field: 'deadline', sortable: true }, // Added deadline column
      { name: 'actions', label: 'Actions', align: 'center' }
    ];

    const editBug = (bug) => {
      editedBug.value = { ...bug };
      editBugDialog.value = true;
    };  

    const updateBug = () => {
      bugStore.updateBug(editedBug.value);
      editBugDialog.value = false;
    };

    const openStatusDialog = (bug) => {
      editedBug.value = { ...bug };
      selectedStatusValue.value = bug.status;
      statusDialog.value = true;
    };

    const changeStatus = () => {
      editedBug.value.status = selectedStatusValue.value.value;
      bugStore.updateBug(editedBug.value);
      statusDialog.value = false;
    };

    return {
      statusOptions,
      statusChangeOptions,
      selectedStatus,
      selectedStatusValue,
      assignedBugs,
      filteredBugs,
      columns,
      editBugDialog,
      statusDialog,
      editedBug,
      editBug,
      updateBug,
      openStatusDialog,
      changeStatus
    };
  }
});
</script>


<style scoped>
.dark {
  background-blend-mode: darken;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.developer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.intro-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.intro-text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.filter-section {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
}

.bug-list {
  width: 100%;
}

.edit-bug-dialog {
  max-width: 500px;
  width: 100%;
}

.status-dialog {
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.status-dialog .q-card-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ccc;
}

.status-dialog .q-card-main .text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
}

.status-dialog .q-btn {
  min-width: auto;
  padding: 8px;
}

.status-dialog .q-card-section {
  padding: 16px;
}

.status-dialog .q-select {
  width: 100%;
}

.status-dialog .q-btn-primary {
  margin-top: 16px;
}
/* Media queries for responsiveness */
@media (min-width: 600px) {
  .developer-content {
    align-items: flex-start;
    text-align: left;
  }

  .intro-title {
    font-size: 3rem;
  }

  .intro-text {
    font-size: 1.5rem;
  }
}
</style>
