<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <div class="logo">
          <span style="color: #6c63ff; font-family: cursive"
            >Bug</span
          >Tracker
        </div>
        <q-space />

      </q-toolbar>
    </q-header>

    <!-- Drawer (Sidebar) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      class="bg-dark"
    >
      <q-list>
      <q-item >
          <q-item-section>
            <q-item-label><div class="details1">
            <q-avatar>
          <q-icon name="person" color="white" />
        </q-avatar>
          <div class="text-subtitle2 q-ml-sm" style="font-size: 1.5rem">
            {{ user.fullname }}
          </div>
          <div class="text-subtitle2 q-ml-sm" style="font-size: 0.7rem">({{ user.designation }})</div>
        </div></q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" @click="leftDrawerOpen = false" clickable v-ripple :to="{
            path: '/developer',
            query: { fullname: user.fullname, username: user.username,designation:user.designation },
          }">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          class="item"
          clickable
          @click="leftDrawerOpen = false"
          v-ripple
          :to="{
            path: '/developer/bugs',
            query: { fullname: user.fullname, username: user.username,designation:user.designation },
          }"
        >
          <q-item-section>
            <q-item-label>View Bugs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" clickable v-ripple to="/">
          <q-item-section>
            <q-item-label>Log out</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Add more menu items as needed -->
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <q-page class="">
        <!-- Your main content goes here -->
        <router-view />
        <div>
          <!-- Placeholder for chart -->
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
      user: {
        fullname: "",
        designation: "",
        username: "", // Corrected from "=" to ":"
      },
    };
  },
  mounted() {
    this.user.fullname = this.$route.query.fullname || "Unknown User";
    this.user.designation =
      this.$route.query.designation || "Unknown Designation";
    this.user.username = this.$route.query.username || "";
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
.item {
  /*border-radius: 0 5rem 5rem 0;*/
  background: #6c63ff;
  color: white;
  margin: 0.5rem;
  font-weight: bolder;
}
.q-list .q-item {
  color: white;
}
.q-avatar {
  background-color: #6c63ff; /* Accent color for avatar background */
}
.details1{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  gap:1rem;
  padding: 1rem 0rem;
}
.q-avatar q-icon {
  font-size: 24px; /* Adjust icon size as needed */
}
.logo{
  font-size:1.5rem;
}
.details {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem;
}
@media (max-width: 768px) {
  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
