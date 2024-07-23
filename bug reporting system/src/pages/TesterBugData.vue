<template>
  <q-page class="q-pa-md dark">
    <q-card class="bug-report-card">
      <q-card-section>
        <div class="text-h5" style="text-align:center;font-weight:bolder;">Bug Details</div>
      </q-card-section>
      
      <q-card-section>
        <q-input outlined v-model="bugTitle" label="Bug Title" class="q-mb-md" dense />
        <q-input outlined v-model="bugDescription" label="Bug Description" class="q-mb-md" type="textarea" rows="5" dense />
        <q-select 
          outlined 
          v-model="bugSeverity" 
          label="Severity" 
          :options="severityOptions" 
          class="q-mb-md" 
          dense 
        />
        <q-btn style="background:#6c63ff;border-radius:5rem;color:#fff;" label="Submit Bug Report" class="full-width q-mb-md" @click="submitBugReport" :loading="loading" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useBugStore } from '../stores/bugStore';

export default {
  data() {
    return {
      username:'',
      bugTitle: '',
      bugDescription: '',
      bugSeverity: 'low',
      loading: false,
      severityOptions: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' }
      ]
    };
  },
  methods: {
    submitBugReport() {
      const newBug = {
        id: Math.random().toString(36).substr(2, 9), 
        title: this.bugTitle,
        description: this.bugDescription,
        severity: this.bugSeverity.value==null?this.bugSeverity:this.bugSeverity.value,
        reportedBy: this.username, 
        status: 'reported', 
        createdAt: new Date(),
        deadline: null,
        assignedTo: null,
      };
      console.log(newBug)
      // Accessing the Pinia store
      const bugStore = useBugStore();

      // Add bug to store
      bugStore.addBug(newBug);
      console.log(bugStore.getBugs());

      // Reset form fields
      this.bugTitle = '';
      this.bugDescription = '';
      this.bugSeverity = 'low';

      // Show success notification or perform other actions
      this.$q.notify({
        color: 'positive',
        icon: 'check',
        message: 'Bug report submitted successfully!',
        position: 'top',
        timeout: 3000,
      });
    },
  },
  mounted(){
    this.username=this.$route.query.username;
  }
};
</script>

<style scoped>
.dark {
  color: white; /* Text color */
  background:black;/* Background image with overlay */
  background-blend-mode: darken; /* Blend mode to overlay the rgba color */
  background-size: 40% 100%; /* Ensures the background image covers the entire element */
  display: flex;
  justify-content: center;
  align-items: center;
}

.bug-report-card {
  width: 100%; /* Full width by default */
  max-width: 40rem; /* Max width */
 /* Semi-transparent background */
  color: #1a1a1a;
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Padding for spacing */ /* Frosted glass effect */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Optional border for better visibility */
}

.full-width {
  width: 10vw;
}
</style>
