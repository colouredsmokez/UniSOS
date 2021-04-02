<template>
    <div class="profile">
        <!--Banner-->
        <div class="header">
            <img class="header-bg" src='../../assets/ProfileBanner.png' alt="profile banner">
            <div class="header-content">
                <!-- Profile Pic -->
                <img class="header-content-pic" :src="profilepic" alt="profile pic">
                <div>
                    <input type="file" v-on:change="previewImage" accept="image/*">
                    <button v-on:click="upload">Upload</button>
                </div>
                <!-- User Info -->
                <h3>{{ name }}</h3>
                <div>{{ email }}</div>
                <div>{{ university }}</div>
            </div>
        </div>
            <!-- Tutor Info -->
            <div class="list">
                <hr>
                <h3>Modules</h3>
                <ul>
                    <li class="list-item" v-for="c in classes" v-bind:key="c">
                        <div>
                            <p>Name : {{ c[1].name }}</p>
                            <p>Info : {{ c[1].info }}</p>
                        </div>
                    </li>
                </ul>
                <hr>
            </div>

            <!-- Notes Info -->
            <div class="list">
                <hr>
                <h3>Notes</h3>
                <ul>
                    <li class="list-item" v-for="n in notes" v-bind:key="n">
                        <div>
                            <p>Name : {{ n[1].name }}</p>
                            <p>Info : {{ n[1].info }}</p>
                        </div>
                    </li>
                </ul>
                <hr>
            </div>

        </div>
</template>

<script>
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { store } from '../../firebase';

export default {
  data() {
    return {
      name: '',
      email: '',
      university: '',
      imageData: null,
      profilepic: null,
      reviews: [],
      notes: [],
      classes: []
    };
  },
  methods: {
    fetchInfo: function() {
        db.collection('users').doc(auth.currentUser.uid).get().then(
            snapshot => {
                var data = snapshot.data();
                this.name = data.name;
                this.email = data.email;
                this.university = data.university;
                this.profilepic = data.profilepic;
                this.reviews = data.reviews;
            },
            err => {
                alert(err.message)
            }
        );
    },
    /*
    fetchNotes: function() {
        db.collection('listings').doc(auth.currentUser.uid).collection('notes').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.notes.push([doc.id,doc.data()])
            });
        });
    },
    fetchClasses: function() {
        db.collection('listings').doc(auth.currentUser.uid).collection('classes').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.classes.push([doc.id,doc.data()])
            });
        });
    },
    */
    upload: function(e) {
        var storageRef = store.ref(`${this.email}/${this.imageData.name}`).put(this.imageData);
        storageRef.on(
            `state_changed`,
            snapshot => {
                console.log(snapshot);
                //this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            },
            error => {
                console.log(error.message);
            },
            () => {
                storageRef.snapshot.ref.getDownloadURL().then(
                    (url) => {
                        this.profilepic = url;
                        db.collection('users').doc(auth.currentUser.uid).update({profilepic:url}).then(
                            () => {
                                alert(`Profile picture changed.`);
                                this.$router.go( this.$router.path );
                            }
                        );
                    }
                );
            }
        );
        e.preventDefault();
    },
    previewImage: function(event) {
      this.imageData = event.target.files[0];
    }
  },
  created() {
    this.fetchInfo();
    //this.fetchNotes();
    //this.fetchClasses();
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'FredokaOne';
    src: url('/fonts/fredokaone-regular-webfont.woff2') format('woff2'),
         url('/fonts/fredokaone-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.profile {
    margin: auto;
}
.header {
    overflow: hidden;
    position: relative;
    background: #003033;
    font-family: 'FredokaOne';
    text-align: center;
    padding: 20px;
}
.header-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    opacity: 0.6;
}
.header-content {
    position: relative;
    color: white;
}
.header-content-pic {
    border-radius: 50em;
    height: 200px;
}
.list {
    margin: auto;
    padding: 20px;
    text-align: center;
}
.list-item {
    list-style-type: none;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 20px;
}
</style>