<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-dark">
      <q-toolbar>
      <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>
          <span style="color:#6c63ff;">Bug</span>Tracker
        </q-toolbar-title>
        <q-space />
        <q-avatar>
           <q-icon name="person" color="white" />
        </q-avatar>
        <div class="text-subtitle2 q-ml-sm">Pauline Seitz</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer (Sidebar) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="bg-dark">
      <q-list>
        <q-item clickable v-ripple to="/dashboardadmin/admin">
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/dashboardadmin/users">
          <q-item-section>
            <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Add more menu items as needed -->
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Your main content goes here -->
        <router-view />
        <div>
          <!-- Placeholder for chart -->
          <q-img src="path/to/your/chart-image.jpg" ratio="16/9" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: true,
    };
  },
};
</script>

<style scoped>
/* Custom styles */
.q-header,
.q-drawer {
  background-color: #1a1a1a;
  color: white;
}

.q-avatar img {
  border-radius: 50%;
}

.q-list .q-item {
  color: white;
}
.q-avatar {
  background-color: #6c63ff; /* Accent color for avatar background */
}

.q-avatar q-icon {
  font-size: 24px; /* Adjust icon size as needed */
}
</style>
