<template>
    <div>
        <div class="form">
            
            <h1>Create a free account</h1>

            <form>

                <!-- Name addon-left-icon="ni ni-circle-08" -->
                <input class="input-text" type="text" placeholder="Name" v-model="name" required>
                <br><br>
                <!-- Email addon-left-icon="ni ni-email-83"-->
                <input class="input-text" type="text" placeholder="Email" v-model="email" required>
                <br><br>
                <!-- Password addon-left-icon="ni ni-lock-circle-open"-->
                <input class="input-text" type="password" placeholder="Password" v-model="password" required>
                <br>
                <!-- Password Check -->
                <small>password strength:
                  <span>strong</span>
                </small>

                <br><br><br>

                <!-- University addon-left-icon="ni ni-hat-3" -->
                <input class="input-text" type="text" placeholder="University" v-model="university" required>
                
                <br><br>

                <!-- University Credentials-->                  
                <h3>Upload a picture of your matriculation card:</h3>
                <input class="input-file" type="file" v-on:change="previewImage" accept="image/*" required>
                <br><br><br>

                <!-- Privacy Policy
                <input type="checkbox" required>
                    <span>I agree with the
                        <a href="#">UniSOS Policy</a>
                    </span>
                <br><br><br>
                -->

                <!-- Submit Button -->
                <button class="btn" v-on:click="register" type="primary">Create account</button>
                <p>Progress: {{uploadValue.toFixed()+"%"}}
                    <progress id="progress" :value="uploadValue" max="100" ></progress>
                </p>

            </form>

        </div>

    </div>
</template>

<script>
import { db } from '../../firebase';
import { store } from '../../firebase';

export default {
  name: 'register',
  data: function() {
    return {
      name: '',
      email: '',
      password: '',
      passwordStrength: 'weak',
      university: '',
      imageData: null,
      uploadValue: 0
    };
  },
  methods: {
    register: function(e) {
      var storageRef = store.ref(`${this.email}/${this.imageData.name}`).put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, 
        error => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(
            (url) => {
              var data = {
                name: this.name,
                email: this.email,
                password: this. password,
                university: this.university,
                credentials: url
              };
              db.collection('requests').add(data).then(() => {
                alert(`Approval may take up to 2 working days.`);
                this.$router.push("/");
                this.$router.go( this.$router.path );
              });
            }
          );
        }
      );
      e.preventDefault();
    },
    previewImage: function(event) {
      this.uploadValue=0;
      this.imageData = event.target.files[0];
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
.input-file {
  font-family: 'FredokaOne';
  font-size: 20px;
  padding: 10px;
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