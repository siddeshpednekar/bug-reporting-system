<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>
      <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
          <div class="logo">
          <span style="color: #6c63ff; font-family: cursive"
            >Bug</span
          >Tracker
        </div>
        <q-space />
      </q-toolbar>
    </q-header>


    <q-drawer v-model="leftDrawerOpen" show-if-above side="left"  class="bg-dark">
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
        <q-item class="item" @click="leftDrawerOpen = false"  clickable v-ripple :to="{
            path: '/admin',
            query: { fullname: user.fullname, username: user.username,designation:user.designation },
          }">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" @click="leftDrawerOpen = false" clickable v-ripple :to="{
            path: '/admin/completed',
            query: { fullname: user.fullname, username: user.username,designation:user.designation },
          }">
          <q-item-section>
            <q-item-label>Completed Bugs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" @click="leftDrawerOpen = false" clickable v-ripple :to="{
            path: '/admin/pending',
            query: { fullname: user.fullname, username: user.username,designation:user.designation },
          }">
          <q-item-section>
            <q-item-label>Pending bugs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="item" @click="leftDrawerOpen = false" clickable v-ripple :to="{
            path: '/',
            query: { fullname: user.fullname, username: user.username,designation:user.designation },
          }">
          <q-item-section>
            <q-item-label>Log out</q-item-label>
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
        useranme:'',
        fullname: '',
        designation: ''
      }
    };
  },
  mounted() {
    this.user.fullname = this.$route.query.fullname || 'Unknown User';
    this.user.designation = this.$route.query.designation || 'Unknown Designation';
    this.user.username = this.$route.query.username || "";
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

.logo{
  font-size:1.5rem;
}
.item{
    /*border-radius:0 5rem 5rem 0;*/
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
</style>
