<template>
  <q-page class="flex items-center justify-center q-pa-md" style="background-color: #000;">
    <div class="row q-col-gutter-md q-mt-xl">
      <transition name="fade-slide">
        <div v-if="showContent" class="col-12 col-md-6 flex items-center justify-center">
          <img src="/test.svg" alt="Login Illustration" class="img full-width" />
        </div>
      </transition>
      <transition name="fade-slide">
        <div v-if="showContent" class="col-12 col-md-6 flex flex-center">
          <q-card class="q-pa-md login-card">
            <q-card-section>
              <div class="text-h5 q-mb-md" style="text-align:center;font-weight:bolder;margin-bottom:2rem;">
                <span style="color:#6c63ff;font-size:2rem;">Sign In</span>
              </div>
              <p class="q-mb-md" style="text-align:center;font-family:cursive;">
                Welcome! Please sign in to report and track bugs efficiently.
              </p>
            </q-card-section>
            
            <q-card-section>
              <q-input outlined v-model="email" label="username" class="q-mb-md" :rules="[val => !!val || 'Username is required']"/>
              <q-input outlined v-model="password" type="password" label="Password" class="q-mb-md" :rules="[val => !!val || 'password is required']"/>
              <div class="row items-center q-mb-md">
                <q-space />
              </div>
              <q-btn style="background:#6c63ff;border-radius:5rem;color:#fff;" label="Log In" class="full-width q-mb-md" @click="login" :loading="loading" />
            </q-card-section>
          </q-card>
        </div>
      </transition>
    </div>
  </q-page>
</template>

<script>
import { useDataStore } from "../stores/userData.js";
import { Notify } from "quasar";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      showContent: false,
      loading: false,
    };
  },
  mounted() {
    this.showContent = true;
  },
  methods: {
    async login() {
      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Email:", this.email);
      console.log("Password:", this.password);

      const dataStore = useDataStore();
      const users = dataStore.users;
      console.log(users);
      const foundUser = users.find((user) => user.username === this.email);
      if (!foundUser) {
        console.error("User not found!");
        this.$nextTick(() => {
          Notify.create({
            message: "User not found!",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
        });
      } else if (foundUser.password === this.password) {
        let route=""
        if(foundUser.designation==="admin")
        {
          route="/admin"
        }else if(foundUser.designation==="tester")
        {
          route="/tester"
        }else if(foundUser.designation==="developer") {
          route="/developer"
        }
        this.$router.push({
          path: route,
          query: {
            username: foundUser.username,
            fullname: foundUser.fullname,
            email: foundUser.email,
            phone: foundUser.phone,
            designation: foundUser.designation,
            userid: foundUser.userid,
          },
        });

        this.$nextTick(() => {
          Notify.create({
            message: `Welcome ${foundUser.fullname}`,
            color: "positive",
            position: "top",
            timeout: 2000,
          });
        });
      } else {
        console.error("Incorrect password");
        this.$nextTick(() => {
          Notify.create({
            message: "Incorrect password",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
        });
      }

      this.loading = false;
    },
  },
};
</script>
<style scoped>
.q-pa-md {
  padding: 16px;
}

.q-mt-xl {
  margin-top: 64px;
}

.img {
  animation: fadeIn 1s ease-in-out;
}

.login-card {
  max-width: 400px;
  background: #fff;
  color: #000;
  border-radius: 5rem;
  padding: 3rem 1rem; 
  animation: fadeIn 1s ease-in-out 0.5s;
  animation-fill-mode: both;
}

.full-width {
  width: 100%;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .login-card {
    padding: 2rem 1rem; 
  }
}
</style>
