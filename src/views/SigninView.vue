<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'HomeView' }">
          <img id="logo" src="../assets/sb.jpeg" />
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signin-div" class="flex-item border">
          <h2 class="pt-4 ps-4">Sign-In</h2>
          <form @submit="signin" class="pt-4 px-4">
            <div class="form-group">
              <label>Email</label>
              <input
                  class="form-control"
                  v-model="email"
                  required
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  required
              />
            </div>
            <small class="form-text text-muted"
            >By continuing, you agree to Simplecoding's Conditions of Use and
              Privacy Notice.</small
            >
            <button type="submit" class="btn btn-primary mt-2 py-0">
              Continue
              <div
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                  role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>
          <hr />
          <small class="form-text text-muted pt-2 pl-4 text-center"
          >New to this web application?</small
          >
          <p class="text-center">
            <router-link
                :to="{ name: 'SignupView' }"
                class="btn btn-dark text-center mx-auto px-5 py-1 mb-2"
            >Create Your Account</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "SigninView",
  props: ["baseUrl"],
  data() {
    return {
      email: null,
      password: null,
      loading: null,
    };
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      this.loading = true;
      const user = {
        username: this.email,
        password: this.password,
      };

      await axios
          .post(`${this.baseUrl}/api/authenticate`, user)
          .then((res) => {
            let token = res.data;
            //let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb2xhbmtpMDQ5NCIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MDc1ODUxMDh9.fxXPckM-_yZhbzTmAYNfsC_6OkhFGxsW2dIS3OLRq1Y';
            localStorage.setItem("token", token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.$emit("fetchData");
            this.$router.push({ name: "HomeView" });
            console.log(res.data);
          })
          .catch((err) => {
            swal({
              text: "Unable to Log in!",
              icon: "error",
              closeOnClickOutside: false,
            });
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
    },
  },
  mounted() {
    this.loading = false;
  }
}
</script>

<style scoped>
.btn-dark {
  background-color: #e7e9ec;
  color: #000;
  font-size: smaller;
  border-radius: 0;
  border-color: #adb1b8 #a2a6ac #a2a6ac;
}
.btn-primary {
  background-color: #f0c14b;
  color: black;
  border-color: #a88734 #9c7e31 #846a29;
  border-radius: 0;
}
#logo {
  width: 150px;
}
@media only screen and (min-width: 992px) {
  #signin-div {
    width: 40%;
  }
}
</style>