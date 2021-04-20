<template>
    <div class="flex-container">
      <div class="flex-child-banner"></div>
      <div class="flex-child-form">
        <h1>Sign in with credentials</h1>
        <br><br><br><br>      
        <form>
          <i class="fa fa-envelope icon" aria-hidden="true"></i>
          <input class="input-text" type="text" placeholder="Email" v-model.trim="email" required>
          <br><br>
          <a class="icon-clickable" @click='showPassword'><i class="fa fa-lock" aria-hidden="true"></i><br><span style="font-size:12px;margin: 0 0 0 -8px">show</span></a>
          <input class="input-text" :type='type' placeholder="Password" v-model.trim="password" required><br>
          <div style="height:23vh"></div>
          <br><br>
          <button class="btn" v-on:click="login">Sign In</button>
          <br><br>
          <!--<a href="#"><small>Forgot password?</small></a>-->
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
      password: '',
      type: 'password',
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
            this.$router.push('/home');
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
    },
    showPassword() {
      if(this.type === 'password') {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
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
  height: 87vh;
  min-width: 1000px;
  min-height: 500px;
}
.flex-child-banner {
  flex: 2;
  background-image: url('../../assets/Banner.png');
  background-position: center;
  background-size: cover;
}
.flex-child-form { 
  flex: 3;
  padding: 20px;
  text-align: center;
  font-family: 'FredokaOne';
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 80%;
}
.input-text {
  width:75%;
  font-size: 20px;
  font-family: 'FredokaOne';
  padding: 15px 15px 15px 55px;
}
.icon {
  padding: 19px;
  text-align: left;
  position: absolute;
  font-size: 20px;
}
.icon-clickable {
  padding: 19px;
  text-align: left;
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  margin-top: -6px;
  transition-duration: 0.4s;
}
.icon-clickable:hover, .icon-clickable:active {
  color:#2BD7E2;
}
.btn {
  font-family: 'FredokaOne';
  border-radius: 0.5em;
  font-size: 20px;
  padding: 10px 50px;
  transition-duration: 0.4s;
  background-color:  #47E4E4;
  box-shadow: 0 0 4px #000000;
  border: none;
  color: white;
  cursor: pointer;
}
.btn:hover {
  background-color: rgba(0, 0, 0, 0.63); /* Green */
  color: white;
}
</style>
