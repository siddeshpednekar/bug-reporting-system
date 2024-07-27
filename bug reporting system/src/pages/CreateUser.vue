<!-- src/components/CreateUserForm.vue -->
<template>
  <q-page class="q-pa-md form-container">
    <q-form @submit="handleSubmit" @reset="resetForm" ref="createUserForm" class="">
      <div style="text-align:center;font-size:2rem;font-weight:bolder;">Create User</div>
      <q-input
        v-model="newUser.username"
        label="Username"
        outlined
        :rules="[val => !!val || 'Username is required']"
        required
      />
      <q-input
        v-model="newUser.fullname"
        label="Full Name"
        outlined
        :rules="[val => !!val || 'Full Name is required']"
        required
      />
      <q-input
        v-model="newUser.email"
        label="Email"
        type="email"
        outlined
        :rules="[val => !!val || 'Email is required', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email']"
        required
      />
      <q-input
        v-model="newUser.phone"
        label="Phone"
        type="tel"
        outlined
        :rules="[val => !!val || 'Phone is required', val => /^\d+$/.test(val) || 'Invalid phone number']"
        required
      />
      <q-input
        v-model="newUser.password"
        label="Password"
        type="password"
        outlined
        :rules="[val => !!val || 'Password is required', val => val.length >= 6 || 'Password must be at least 6 characters long']"
        required
      />
      <q-select
        v-model="newUser.designation"
        :options="designations"
        label="Designation"
        outlined
        :rules="[val => !!val || 'Designation is required']"
        required
      />

      <div class="">
        <q-btn label="Create User" type="submit" style="background-color:#6c63ff;color:white;" class="full-width" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useDataStore } from '../stores/userData';
import { Notify } from 'quasar';

export default {
  name: 'CreateUserForm',
  setup() {
    const dataStore = useDataStore();

    const newUser = ref({
      username: '',
      fullname: '',
      email: '',
      phone: '',
      password: '',
      designation: '',
      userid: '',
    });

    const designations = ['admin', 'tester', 'developer'];

    const generateUniqueUserId = () => {
      let newId;
      do {
        newId = Date.now().toString();
      } while (dataStore.users.find(user => user.userid === newId));
      return newId;
    };

    const handleSubmit = () => {
      if (dataStore.users.find(user => user.username === newUser.value.username)) {
        Notify.create({
          message: 'Username is already taken',
          type: 'negative',
          position: 'top',
        });
        return;
      }

      newUser.value.userid = generateUniqueUserId();
      dataStore.addUser({ ...newUser.value });
      dataStore.display();
      Notify.create({
        message: 'User created successfully',
        type: 'positive',
        position: 'top',
      });
      resetForm();
    };

    const resetForm = () => {
      
    };

    return {
      newUser,
      designations,
      handleSubmit,
      resetForm,
    };
  },
};
</script>

<style scoped>

.form-container {
  border-radius: 8px;
  background:black;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.q-form{
    color:black;
    background:white;
    padding:2rem;
    width:80vw;
    border-radius:2rem;
}
.full-width {
  width: 100%;
}

.q-input, .q-select {
  margin-bottom: 16px;
}
@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
  .q-form{
    width:100%;
  }
}
</style>
