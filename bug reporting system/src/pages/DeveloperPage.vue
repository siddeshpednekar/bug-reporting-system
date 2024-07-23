<template>
  <q-page class="q-pa-md dark">
    <div class="home-content">
      <div class="intro-section">
        <h1 class="intro-title">Welcome, <span style="color:#6c63ff;">Developer!</span></h1>
        <p class="intro-text">
          Manage your projects, review code, and collaborate with your team.
          Your developer tools are here to help you build amazing applications.
        </p>
        <q-btn
          class="intro-button"
          label="Get Started"
          @click="navigateToDashboard"
          size="lg"
        />
      </div>
    </div>

    <div class="feature-section q-pa-md">
      <h2 class="feature-title" style="color:white;">Features</h2>
      <div class="feature-list">
        <q-card class="feature-card">
          <q-card-section>
            <q-icon name="code" size="40px" class="q-mb-sm" />
            <h3 class="feature-name">Code Review</h3>
            <p class="feature-description">Review and collaborate on code with your team.</p>
          </q-card-section>
        </q-card>
        <q-card class="feature-card">
          <q-card-section>
            <q-icon name="build" size="40px" class="q-mb-sm" />
            <h3 class="feature-name">Project Management</h3>
            <p class="feature-description">Track and manage your projects effectively.</p>
          </q-card-section>
        </q-card>
        <q-card class="feature-card">
          <q-card-section>
            <q-icon name="people" size="40px" class="q-mb-sm" />
            <h3 class="feature-name">Team Collaboration</h3>
            <p class="feature-description">Collaborate with your team in real-time.</p>
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
      user: {
        fullname: "",
        designation: "",
        username: "",
      },
      testimonialIndex: 0,
      testimonials: [
        {
          name: "John Doe",
          position: "Senior Developer",
          text: "This platform has significantly improved our team's productivity.",
          avatar: "/john-doe.jpg",
        },
        {
          name: "Jane Smith",
          position: "Project Manager",
          text: "The project management features are top-notch and easy to use.",
          avatar: "/jane-smith.jpg",
        },
      ],
    };
  },
  methods: {
    navigateToDashboard() {
      this.$router.push({
        path: "/developer/bugs",
        query: { fullname: this.user.fullname, username: this.user.username },
      });
    },
  },
  mounted() {
    this.user.fullname = this.$route.query.fullname || "Unknown User";
    this.user.designation = this.$route.query.designation || "Unknown Designation";
    this.user.username = this.$route.query.username || "";
  },
};
</script>

<style scoped>
.dark {
  color: white;
  background: black;
  background-blend-mode: darken;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 2rem;
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

.intro-image {
  max-width: 100%;
  height: auto;
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

</style>
