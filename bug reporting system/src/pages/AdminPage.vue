<template>
  <q-page class="q-pa-md dark">
    <div class="home-content">
      <div class="intro-section">
        <h1 class="intro-title">Welcome, Admin!</h1>
        <p class="intro-text">
          Manage users, oversee projects, and ensure smooth operations. Your admin tools are here to help you maintain excellence.
        </p>
        <q-btn class="intro-button" label="Get Started" @click="navigateToDashboard" />
      </div>
      <div class="image-section">
        <!-- You can add additional decorative images or SVGs here -->
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  methods: {
    navigateToDashboard() {
      this.$router.push('/admin/dashboard'); // Replace with your actual route name
    },
  },
};
</script>

<style scoped>
.dark {
  color: white; /* Text color */
  background: rgba(0,0,0,0.5) url('/bg4.png') no-repeat; /* Background image with overlay */
  background-blend-mode: darken; /* Blend mode to overlay the rgba color */
  background-size: cover; /* Ensures the background image covers the entire element */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure it takes the full height of the viewport */
  padding: 1rem; /* Add some padding for small screens */
}

.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.intro-section {
  max-width: 600px;
  margin: 2rem 0;
}

.intro-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.intro-text {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.intro-button {
  background: #6c63ff;
  border-radius: 5rem;
  color: #fff;
  padding: 0.5rem 2rem;
}

.image-section {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

/* Media queries for responsiveness */
@media (min-width: 600px) {
  .home-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .intro-section {
    text-align: left;
  }

  .image-section {
    width: 50%;
  }
}

@media (min-width: 960px) {
  .intro-title {
    font-size: 3rem;
  }

  .intro-text {
    font-size: 1.5rem;
  }
}
</style>
