<template>
  <q-page class="login-page">
    <div class="form-container">
      <div class="form-content">
        <q-icon name="person" size="64px" class="icon" />
        <h2>Login</h2>
        <q-input v-model="email" label="Email" filled dense class="input-field" />
        <q-input v-model="password" label="Password" type="password" filled dense class="input-field" />
        <q-btn @click="login" label="LOGIN" class="login-btn" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Handle login logic
    },
    goToSignUp() {
      this.$router.push('/signup');
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: 
    linear-gradient(45deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
    rgba(0, 0, 0, 0.3) url("/bg2.webp");
  background-repeat: no-repeat;
  background-size: cover;
}



.form-container {
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  padding: 40px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Optional: light border to enhance glassy effect */
}


.form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  color: #000; /* Bright accent color for icon */
  margin-bottom: 20px;
}

h2 {
  color: #c5c6c7; /* Light gray text for better contrast */
  margin-bottom: 30px;
  font-size: 24px;
}

.input-field {
  width: 100%;
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  margin-bottom: 10px;
  background-color: #000; /* Bright accent color */
  color: #fff; /* Dark text for better contrast */
}

.signup-btn {
  width: 100%;
  color: #66fcf1; /* Bright accent color for text */
}
</style>
