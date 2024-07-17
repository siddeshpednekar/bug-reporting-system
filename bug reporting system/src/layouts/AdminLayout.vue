<template>
  <q-layout view="hHh lpR fFf">
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
        <div class="text-subtitle2 q-ml-sm">{{ user.fullname }}</div>
        <div class="text-subtitle2 q-ml-sm">({{ user.designation }})</div>
      </q-toolbar>
    </q-header>


    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="bg-dark">
      <q-list>
        <q-item class="item" clickable v-ripple to="/admin">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" clickable v-ripple to="/admin/bugs">
          <q-item-section>
            <q-item-label>view Bugs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" clickable v-ripple to="/">
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>


    <q-page-container>
      <q-page class="">
        <router-view />
        <div>
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
        fullname: '',
        designation: ''
      }
    };
  },
  mounted() {
    this.user.fullname = this.$route.query.fullname || 'Unknown User';
    this.user.designation = this.$route.query.designation || 'Unknown Designation';
  }
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

.item{
    border-radius:0 5rem 5rem 0;
    background:#6c63ff;
    color:white;
    margin:0.5rem;
    font-weight:bolder;
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
