<template>
  <q-page class="q-pa-md dark">
    <div class="home-content">
      <div class="intro-section">
        <h1 class="intro-title">Welcome, <span style="color:#6c63ff;">Admin!</span></h1>
        <p class="intro-text">
          Manage users, oversee projects, and ensure smooth operations. Your admin tools are here to help you maintain excellence.
        </p>
        <q-btn class="intro-button" label="Get Started" @click="navigateToDashboard" size="lg" />
      </div>
    </div>

    <div class="feature-section q-pa-md">
      <h2 class="feature-title" style="color:white;">Features</h2>
      <div class="feature-list">
        <q-card class="feature-card">
          <q-card-section>
            <q-icon name="supervisor_account" size="40px" class="q-mb-sm" />
            <h3 class="feature-name">User Management</h3>
            <p class="feature-description">Manage and oversee user accounts and permissions.</p>
          </q-card-section>
        </q-card>
        <q-card class="feature-card">
          <q-card-section>
            <q-icon name="assessment" size="40px" class="q-mb-sm" />
            <h3 class="feature-name">Project Oversight</h3>
            <p class="feature-description">Track and manage ongoing projects effectively.</p>
          </q-card-section>
        </q-card>
        <q-card class="feature-card">
          <q-card-section>
            <q-icon name="security" size="40px" class="q-mb-sm" />
            <h3 class="feature-name">Security</h3>
            <p class="feature-description">Ensure the security and integrity of your system.</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="testimonial-section q-mt-xl q-pa-md">
      <q-carousel
        v-model="testimonialIndex"
        navigation-position="bottom"
        navigation-icon="lens"
        navigation-active-icon="lens"
        swipeable
        animated
      >
        <q-carousel-slide v-for="(testimonial, index) in testimonials" :name="index.toString()" :key="index">
          <q-card class="testimonial-card">
            <q-card-section >
              <q-avatar>
                <img :src="testimonial.avatar" :alt="testimonial.name" />
              </q-avatar>
              <h3 class="testimonial-name">{{ testimonial.name }}</h3>
              <p class="testimonial-position">{{ testimonial.position }}</p>
              <p class="testimonial-text">{{ testimonial.text }}</p>
            </q-card-section>
          </q-card>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>


<script>
export default {
  data() {
    return {
      testimonialIndex: 0,
      testimonials: [
        {
          name: "Alice Johnson",
          position: "System Administrator",
          text: "The admin tools have streamlined our user management process.",
          avatar: "/alice-johnson.jpg",
        },
        {
          name: "Bob Brown",
          position: "Operations Manager",
          text: "Project oversight has never been easier thanks to this platform.",
          avatar: "/bob-brown.jpg",
        },
      ],
    };
  },
  methods: {
    navigateToDashboard() {
      this.$router.push('/admin/pending'); // Replace with your actual route name
    },
  },
};
</script>

<style scoped>
.dark {
  color: white; /* Text color */
  background: black; /* Background image with overlay */
  background-blend-mode: darken; /* Blend mode to overlay the rgba color */
  background-size: cover; /* Ensures the background image covers the entire element */
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
}

.intro-title {
  font-size: 2.5rem;
  text-align:center;
  font-weight: bold;
}

.intro-text {
  font-size: 1.2rem;
  text-align:center;
  margin: 1rem 0;
}

.intro-button {
  background: #6c63ff;
  border-radius: 5rem;
  color: #fff;
  padding: 0.5rem 2rem;
}

.feature-section {
  color:black;
  text-align: center;
}

.feature-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-card {
  width: 300px;
  margin: 1rem;
}

.feature-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.feature-description {
  font-size: 1rem;
}

.testimonial-section {
  text-align: center;
}

.testimonial-card {
  max-width: 500px;
  margin: 0 auto;
}

.testimonial-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.testimonial-position {
  font-size: 1rem;
  color: #aaa;
}

.testimonial-text {
  font-size: 1rem;
  margin-top: 1rem;
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
