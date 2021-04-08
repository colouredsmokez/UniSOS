<template>
    <div class="flex-container">
      <div class="flex-child-banner"></div>
      <div class="flex-child-form">
        <h1>Sign in with credentials</h1>
        <br><br><br><br>      
        <form>
          <i class="fa fa-envelope" aria-hidden="true"></i>
          <input class="input-text" type="text" placeholder="Email" v-model="email" required>
          <br><br>
          <input class="input-text" type="password" placeholder="Password" v-model="password" required>
          <br><br><br><br><br><br><br><br><br><br><br><br>
          <button class="btn" v-on:click="login">Sign In</button>
          <br>
          <a href="#"><small>Forgot password?</small></a>
        </form>
      </div>
    </div>
</template>

<script>
import { auth } from '../../firebase';
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        userCredential => {
          var user = userCredential.user;
          if (this.email == "admin@unisos.com" && this.password == "unisos") {
            alert(`You are logged in as an Administrator`);
            this.$router.push("/admin");
            this.$router.go( this.$router.path );
          } else if (user.emailVerified) {
            alert(`You are logged in as ${user.email}`);
            this.$router.push('/myprofile');
            this.$router.go( this.$router.path );
          } else {
            alert(`${user.email} is not verified`);
          }
        },
        err => {
          alert(err.message);
        }
      );
      e.preventDefault();
    }
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
.flex-container {
  display: flex;
  margin: auto;
  height: 80vh;
}
.flex-child-banner {
  flex: 2;
  background-image: url('../../assets/Banner.png');
  background-position: center;
  background-size: cover;
  height: 107%;
}
.flex-child-form { 
  flex: 3;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: 'FredokaOne';
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 80%;
  height: 100%;
}
.input-text {
  width:75%;
  font-size: 20px;
  font-family: 'FredokaOne';
  padding: 15px;
}
i {
  position: absolute;
  left: 15px;
  top: 40px;
  color: gray;
}
.btn {
  font-family: 'FredokaOne';
  border-radius: 0.5em;
  font-size: 20px;
  padding: 10px 50px;
  transition-duration: 0.4s;
  background-color: #2BD7E2;
  color: white;
}
.btn:hover {
  background-color: black; /* Green */
  color: white;
}
</style>
