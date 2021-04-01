<template>
    <div>
        <div class="form">

            <h1>Sign in with credentials</h1>
                    
            <form>
                <input class="input-text" type="text" placeholder="Email" v-model="email" required>
                <br><br>
                <input class="input-text" type="password" placeholder="Password" v-model="password" required>
                <br><br>
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
.form {
    margin: auto;
    padding: 20px;
    text-align: center;
    font-family: 'FredokaOne';
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 50%;
}
.input-text {
  width:75%;
  font-size: 20px;
  font-family: 'FredokaOne';
  padding: 15px;
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
