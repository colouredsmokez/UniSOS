<template>
    <div>

      <!-- Logged Out -->
      <div class="flex-container" v-if="isLoggedOut">
        <!-- Logo -->
        <div class="flex-child">
          <router-link to="/">
            <img class="logo" src="../../assets/UniSOSlogo.png" alt="unisos logo">
          </router-link>
        </div>
        <!-- Page Links -->
        <div class="flex-child">
          <div class="auth-wrapper">
            <router-link class="auth" to="/login">Login</router-link>
            <router-link class="auth" to="/register">Register</router-link>
          </div>
        </div>
      </div>

      <!-- Logged In -->
      <div v-if="isLoggedIn">

        <div class="flex-container">
          <div class="flex-child">
            <!-- Logo -->
            <router-link to="/">
              <img class="logo" src="../../assets/UniSOSlogo.png" alt="unisos logo">
            </router-link>
          </div>
          <div class="flex-child">
            <!-- Log Out -->
            <div class="auth-wrapper">
              <router-link class="auth" to="/myprofile"><img class="img" :src="profilepic" alt="profile pic">{{ name }}</router-link>
              <button class="btn" v-on:click="logout">Logout</button>
            </div>
          </div>
        </div>

        <div class="flex-container">
          <div class="flex-child gradient">
            <!-- Page Links -->
            <div class="nav-wrapper">
              <router-link class="nav" to="/home"><img src = "../../assets/Recommendations.png" alt="home"></router-link>
              <router-link class="nav" to="/listings"><img src = "../../assets/Listings.png" alt="listings"></router-link>
              <router-link class="nav" to="/upload"><img src = "../../assets/Upload.png" alt="upload"></router-link>
              <router-link class="nav" to="/mynotes"><img src = "../../assets/Notes.png" alt="my notes"></router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin -->
      <div v-if="isAdmin">

        <div class="flex-container">
          <div class="flex-child">
            <!-- Logo -->
            <router-link to="/">
              <img class="logo" src="../../assets/UniSOSlogo.png" alt="unisos logo">
            </router-link>
          </div>
          <div class="flex-child">
            <!-- Log Out -->
            <div class="auth-wrapper">
              <router-link class="auth" to="/admin">Requests</router-link>
              <button class="btn" v-on:click="logout">Logout</button>
            </div>
          </div>
        </div>

        <div class="flex-container">
          <div class="flex-child gradient">
            <!-- Page Links -->
            <div class="nav-wrapper">
              <router-link class="nav" to="/listings"><img src = "../../assets/Listings.png" alt="listings"></router-link>
            </div>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
import { db } from '../../firebase';
import { auth } from '../../firebase';

export default {
  data() {
    return {
      isAdmin: false,
      isLoggedIn: false,
      isLoggedOut: false,
      name: "",
      profilepic: null,
    };
  },
  created() {
    if (auth.currentUser && auth.currentUser.email == "admin@unisos.com") {
      this.isAdmin = true;
    } else if (auth.currentUser && auth.currentUser.emailVerified) {
      this.isLoggedIn = true;
      this.fetchInfo();
    } else {
      this.isLoggedOut = true;
    }
  },
  methods: {
    logout: function() {
      auth
        .signOut()
        .then(() => {
          alert(`You are logged out of ${this.name}`);
          this.$router.go({ path: this.$router.path });
        });
    },
    fetchInfo: function() {
      db.collection('users').doc(auth.currentUser.uid).get().then(
        snapshot => {
          var data = snapshot.data();
            this.name = data.name;
            this.profilepic = data.profilepic;
        },
        err => {
          alert(err.message)
        }
      );
    },
  }
};
</script>

<style scoped>
@font-face {
    font-family: 'FredokaOne';
    src: url('/fonts/fredokaone-regular-webfont.woff2') format('woff2'),
         url('/fonts/fredokaone-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.gradient {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #47E4E4;
}
.flex-container {
  display: flex;
  margin: auto;
}
.flex-child {
  flex: 1;
  margin : auto;
}  
.logo {
    height: 50px;
    width: auto;
}
.nav-wrapper {
  display: flex;
  width: 70%;
  margin: auto;
}
.nav {
  flex: 1;
  text-align: center;
  color: #5ABAC0;
}
.nav:hover, .nav:active, .nav-wrapper .router-link-active{
  border-bottom: thick solid #25abb4;

}
.auth-wrapper {
  float: right;
}
.auth {
  font-family: 'FredokaOne';
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #2BD7E2;
  vertical-align: middle;
}
.auth:hover, .auth:active {
  color: #000000;
}
.img {
  border-radius: 50em;
  height: 50px;
  width: 50px;
  vertical-align: middle;
  padding: 10px;
}
.btn {
  font-family: 'FredokaOne';
  border-radius: 0.5em;
  padding: 10px 20px;
  transition-duration: 0.4s;
  background-color: #25abb4;
  color: white;
  vertical-align: middle;
  border: none;
}
.btn:hover {
  background-color: black; /* Green */
  color: white;
}
</style>