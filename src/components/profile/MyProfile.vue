<template>
    <div class="profile">
        <!--Banner-->
        <div class="header">
            <img class="header-bg" src='../../assets/ProfileBanner2.png' alt="profile banner">
            <div class="header-content">
                <!-- Profile Pic -->
                <div class="image-cropper">
                    <img class="profile-pic" :src="profilepic" alt="profile pic">
                </div>
                <!-- User Info -->
                <h2>{{ name }}</h2>
                <div>{{ email }}</div>
                <div>{{ university }}</div>
            </div>
        </div>
        <br>
        <div class="body">

            <div class="child-1">
                <!-- Bio -->
                <div class="bio">
                    <h1 class="title">Bio</h1>
                    {{ bio }}
                </div>
                <!-- Modules Taking-->
                <div class="mods">
                    <h1 class="title"> Modules I'm Taking </h1>
                    <ul>
                        <li class="mod" v-for="mod in modules" v-bind:key="mod">
                            {{mod}}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="child-2">
                <!-- Lisitngs -->
                <div class="listings">
                    <h1 class="title"> Listings </h1>
                    <ul>
                        <li class="listing" v-for="l in listings" v-bind:key="l.id" v-bind:id="l.id" v-on:click="show($event)" >
                            <b> Type of listing : </b> {{ l.typeOfList }}<br>
                            <b> Module : </b> {{ l.module }}<br>
                            <b> Rating : </b> {{ l.rating}}<br>
                            <ul v-for="review in l.reviewsData" v-bind:key="review.name"  v-show="l.show">
                                <li> 
                                    <p> Name: {{review.name}}</p>
                                    <p> Rating: {{review.rating}}</p>
                                    <p> Review: {{review.review}}</p>
                                </li> 
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../../firebase";
import { auth } from "../../firebase";

export default {
  data() {
    return {
      uid: auth.currentUser.uid,
      name: "",
      email: "",
      university: "",
      profilepic: "https://firebasestorage.googleapis.com/v0/b/unisos-bcf1f.appspot.com/o/defaultpfp.jpg?alt=media&token=5fd8c012-3d56-4771-be88-fa4ae98d3d32",
      bio: "",
      modules: [],
      listings: {}
    };
  },
  methods: {
    show(event) {
        let id = event.target.getAttribute("id");
        console.log(id);
        var status = this.listings[id].show;
        this.listings[id].show = !status;
    },
    fetchInfo() {
        db.collection("users").doc(this.uid).get().then((snapshot) => {
            var data = snapshot.data();
            this.name = data.name;
            this.email = data.email;
            this.university = data.university;
            this.profilepic = data.profilepic;
            this.bio = data.bio;
            this.modules = data.modules;
            var listings = {};
            db.collection("listing").get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    var id = doc.id;
                    var docData = doc.data();
                    docData["id"] = id;
                    if(docData.userId == this.uid) {
                        docData.show = false;
                        listings[id] = docData;
                    }
                });
                this.listings = listings;
                console.log(this.listings);
            });
            /*
            var notes = data.selling;
            var lessons = data.teaching;
            notes.forEach(note => {
                db.collection("listing").doc(note).get().then(doc => {
                    var noteData = doc.data();
                    var id = doc.id;
                    noteData["id"] = id;
                    noteData.show = false;
                    this.listings[id] = noteData;
                });
            });
            lessons.forEach(lesson => {
                db.collection("listing").doc(lesson).get().then(doc => {
                    var lessonData = doc.data();
                    var id = doc.id;
                    lessonData["id"] = id;
                    lessonData.show = false;
                    this.listings[id] = lessonData;
                });
            });
            */
        });
    }
  },
  created() {
        this.fetchInfo();
  },
};
</script>

<style scoped>
@font-face {
  font-family: "FredokaOne";
  src: url("/fonts/fredokaone-regular-webfont.woff2") format("woff2"),
    url("/fonts/fredokaone-regular-webfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
.header {
  overflow: hidden;
  position: relative;
  background: black;
  font-family: "FredokaOne";
  text-align: center;
  padding: 30px;
}
.header-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
.header-content {
  position: relative;
  color: white;
}
.image-cropper {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
}
.profile-pic {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.body {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  background-color: whitesmoke;
  border-radius: 25px;
  box-shadow: inset 0 0 2px #000000;
  display: flex;
  min-height: 500px;
}
.child-1 {
  flex: 2;
}
.child-2 {
  flex: 3;
}
.bio {
  white-space: pre-line;
  margin: 30px;
  border-radius: 5px;
  box-shadow: 0 0 8px #000000;
  box-sizing: border-box;
  padding: 20px;
  border: black solid;
  min-height: 250px;
}
.title {
  font-family: "FredokaOne";
  font-size: 30px;
}
.mods {
  margin: 30px;
  border-radius: 5px;
  box-shadow: 0 0 8px #000000;
  box-sizing: border-box;
  padding: 20px;
  border: black solid;
  min-height: 250px;
}
.mod {
  list-style-type: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
}
.listings {
  margin: 30px 30px 30px 0px;
  border-radius: 5px;
  box-shadow: 0 0 8px #000000;
  box-sizing: border-box;
  padding: 20px;
}
.listing {
  list-style-type: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
}
</style>