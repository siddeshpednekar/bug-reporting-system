<template>
  <q-page class="q-pa-md dark">
    <div class="home-content">
      <div class="intro-section">
        <h1 class="intro-title">Welcome, Tester!</h1>
        <p class="intro-text">
          Track, manage, and report bugs effectively. Our tool helps you ensure the best quality for your projects.
        </p>
        <q-btn class="intro-button" label="Get Started" @click="navigateToBugReport" />
      </div>
      <div class="image-section">
      </div>
    </div>
  </q-page>
</template>


<script>
export default {
  methods: {
    navigateToBugReport() {
      this.$router.push('/tester/report'); 
    },
  },
};
</script>

<style scoped>
.dark {
  color: white; 
  background:rgba(0,0,0,0.5) url('/bg13.jpg') no-repeat; 
  background-blend-mode: darken; 
  background-size:cover; 
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  padding: 1rem; 
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
