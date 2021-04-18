<template>
    <div class="flex-container form">
      <div class="flex-child-banner"></div>
      <div class="flex-child-form">
        <h1>Create a free account</h1>
        <form>
          <!-- Name -->
          <i class="fa fa-user icon" aria-hidden="true"></i>
          <input 
            class="input-text" 
            type="text" 
            placeholder="Name" 
            v-model="name" 
            minlength="1"
            maxlength="50"
            required
          >
          <br><br>
          <!-- Email -->
          <i class="fa fa-envelope icon" aria-hidden="true"></i>
          <input 
            class="input-text" 
            type="email" 
            placeholder="Email" 
            v-model="email"
            required
          >
          <br><br>
          <!-- Password -->
          <a class="icon-clickable" @click='showPassword'><i class="fa fa-lock" aria-hidden="true"></i></a>
          <input 
            class="input-text" 
            :type="type"
            placeholder="Password"
            v-model="password"
            minlength="8"
            maxlength="20"
            required 
          >
          <br><br><br>
          <!-- University Credentials-->  
          <div class="uni-wrapper">
            <div class="uni-selection">
              <h3>Attending University</h3>
              <select class="selection" v-model="university" required>
                <option class="selection-item" value="National University of Singapore">NUS</option>
                <option class="selection-item" value="Nanyang Technological University">NTU</option>
                <option class="selection-item" value="Singapore Management University">SMU</option>
              </select>
            </div>
            <div class="uni-upload">    
              <h3>Snapshot of your matriculation card</h3>
              <input class="input-file" type="file" v-on:change="previewImage" accept="image/*" required>
            </div>
          </div>
          <br><br><br>
          <!-- Privacy Policy
          <input type="checkbox" required>
          <span>I agree with the
            <a href="#">UniSOS Policy</a>
          </span>
          -->
          <!-- Submit Button -->
          <button class="btn" v-on:click="register">Create account</button>
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
      name: null,
      email: null,
      password: null,
      type: 'password',
      university: null,
      imageData: null,
      uploadValue: 0
    };
  },
  methods: {
    register: function() {
      var nameFormat = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      if (!this.name) {
        alert("Name is empty");
      } else if (this.name.length > 50) {
        alert("Name is too long");
      } else if (!this.name.match(nameFormat)) {
        alert(this.name + " is invalid");
      } else if (!this.email) {
        alert("Email is empty");
      } else if (!this.email.match(emailFormat)) {
        alert("Email is invalid");
      } else if (!this.password) {
        alert("Password is empty");
      } else if (!this.password.match(pwFormat)) {
        alert("Password should be 8 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter");
      } else if (!this.university) {
        alert("Please select a university");
      } else if (!this.imageData) {
        alert("Please upload a snapshot of your matriculation card");
      } else {
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
            this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then(
              (url) => {
                var data = {
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  university: this.university,
                  credentials: url,
                  profilepic: "https://firebasestorage.googleapis.com/v0/b/unisos-bcf1f.appspot.com/o/defaultpfp.jpg?alt=media&token=5fd8c012-3d56-4771-be88-fa4ae98d3d32",
                  bio: "",
                  modules: [],
                  selling: [], //just add listing id
                  teaching: [], //just add listing id
                  myNotes: {},
                  chatUsers: {}
                };
                db.collection('requests').add(data).then(
                  () => {
                    alert(`Approval may take up to 2 working days.`);
                    this.$router.push("/");
                    this.$router.go( this.$router.path );
                  }
                );
              }
            );
          }
        );
      }
    },
    previewImage: function(event) {
      this.uploadValue=0;
      this.imageData = event.target.files[0];
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
  margin: auto;
  height: 80vh;
}
.flex-child-banner {
  flex: 2;
  background-image: url('../../assets/Banner.png');
  background-position: center;
  background-size: cover;
  height:107%;
}
.flex-child-form { 
  flex: 3;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: 'FredokaOne';
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 80%;
  height:100%;
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
  font-size: 20px;
  cursor: pointer;
}
.icon-clickable:hover, .icon-clickable:active {
  color:#2BD7E2;
}
.uni-wrapper {
  display: flex;
  margin: auto;
  width: 80%;
}
.uni-selection {
  flex: 2;
}
.selection {
  width: 65%;
  font-size: 20px;
  font-family: 'FredokaOne';
  padding: 10px;
  cursor:pointer;
}
.selection-item {
  font-size: 20px;
  font-family: 'FredokaOne';
}
.uni-upload {
  flex: 3;
}
.input-file {
  font-family: 'FredokaOne';
  font-size: 20px;
  width: 75%;
}
.input-file::-webkit-file-upload-button {
  font-family: 'FredokaOne';
  font-size: 20px;
  padding: 10px;
  transition-duration: 0.4s;
  cursor: pointer;
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
  background-color: rgba(0, 0, 0, 0.63);
  color: white;
}
</style>