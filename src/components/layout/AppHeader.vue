<template>
    <div>
      
      <!-- Logged Out -->
      <div v-if="isLoggedOut" class="flex-container" >
        <!-- Logo -->
        <div class="flex-child">
          <router-link to="/">
            <img class="logo" src="../../assets/UniSOSlogo.png" alt="unisos logo">
          </router-link>
        </div>
        <!-- Page Links -->
        <div class="flex-child align-right">
          <div class="inline-block">
            <router-link class="profile" to="/login">Login</router-link>
          </div>
          <div class="inline-block">
            <router-link class="profile" to="/register">Register</router-link>
          </div>
        </div>
      </div>

      <!-- Logged In -->
      <div v-if="isLoggedIn">
        <div class="flex-container">
          <!-- Logo -->
          <div class="flex-child">
            <router-link to="/">
              <img class="logo" src="../../assets/UniSOSlogo.png" alt="UnisosLogo">
            </router-link>
          </div>
          <!-- Log Out -->
          <div class="flex-child align-right">
            <div class="inline-block">
              
                <div class="flex-child-auto"><div class="image-cropper"><img class="profile-pic" :src="profilepic" alt="ProfilePic"></div></div>
                <div class="flex-child-auto">
                  <div class="dropdown">
                    <button class="dropbtn"> {{ name }} </button>
                    <div class="dropdown-content">
                      <ul>
                        <li> <router-link class="profile" to="/myprofile"> Profile </router-link> </li>
                        <li> <router-link class="edit" to="/editprofile"> Edit Profile </router-link> </li>
                        <li> <router-link class="chat" to= "name:'chat', params:{ uid:uid }"> Chats </router-link> </li>
                      </ul>
                    </div>
                  </div> 
                   
                </div>
              
            </div>
            <div class="inline-block">
              <button class="logout" v-on:click="logout">Logout</button>
            </div>
          </div>
        </div>
        <!-- Page Links -->
        <div class="flex-container">
          <div class="flex-child gradient">
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
          <!-- Logo -->
          <div class="flex-child">
            <router-link to="/">
              <img class="logo" src="../../assets/UniSOSlogo.png" alt="unisos logo">
            </router-link>
          </div>
          <!-- Log Out -->
          <div class="flex-child align-right">
            <div class="inline-block">
              <router-link class="profile" to="/admin">Requests</router-link>
            </div>
            <div class="inline-block">
              <button class="logout" v-on:click="logout">Logout</button>
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
      uid: null,
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
            this.uid = data.uid
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
  align-items:center;
  display: flex;
}
.flex-child {
  flex: 1;
}
.align-right {
  text-align:right;
}
.inline-block {
  display: inline-block;
  padding: 10px;
  vertical-align: middle;
}
.logo {
  height: 50px;
  width: auto;
}

.flex-child-auto {
  flex: auto;
}
.image-cropper {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
}
.profile-pic {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.logout {
  font-family: 'FredokaOne';
  font-size: 13px;
  border-radius: 0.5em;
  padding: 10px 20px;
  transition-duration: 0.4s;
  background-color:  #47E4E4;
  box-shadow: 0 0 4px #000000;
  color: white;
  vertical-align: middle;
  border: none;
  cursor:pointer;
}
.logout:hover {
  background-color: rgba(0, 0, 0, 0.63);
  color: white;
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

/* .profile:hover, .profile:active {
  color: rgba(0, 0, 0, 0.63);
} */

.dropdown {
  overflow: hidden;
}

.dropdown .dropbtn {
  font-family: 'FredokaOne';
  font-size: 16px; 
  text-decoration: none;
  border: none;
  color: #2BD7E2;
  gap: 10px;
  display: flex;
  align-items: center;
  background: none;
}
/* Dropdown content (hidden by default) */
.dropdown-content  {
  font-family: 'FredokaOne';
  text-align: center;
  display: none;
  position: absolute;
  background-color: #706c6c;
  backdrop-filter: blur(5px);
  min-width: 160px;
  height: 80px;
  z-index: 1;
  border-bottom-left-radius:12px;
  border-bottom-right-radius:12px;
  border-top-right-radius: 12px;
}
a {
  text-decoration: none;
  color: white;;
}
a:hover {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.63),
}
ul {
  list-style-type: none;
  padding: 0;
  margin-top: 0px;
}
li:hover {
  background-color: #2BD7E2;
}

/* Links inside the dropdown */
.chat .profile .edit {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a grey background color to dropdown links on hover */
.dropdown-content router-link:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
  color: rgba(0, 0, 0, 0.63);
  
}
.dropbtn:hover {
  color: rgba(0, 0, 0, 0.63);
}
</style>