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
                        <li class="listing" v-for="n in listing" v-bind:key="n.id" v-on:click="n.show = !n.show" >
                            <div>
                                <b> Type of listing : </b> {{ n.typeOfList }}
                                <b> Module : </b> {{ n.module }}<br>
                                 <b> Rating : </b> {{n.rating}}<br>
                                <ul class="listing" v-for="review in n.reviewsData" v-bind:key="review"  v-show="n.show">
                                    <li> 
                                        <div>
                                            <p> Name: {{review.name}}</p>
                                            <p> Rating: {{review.rating}}/3</p>
                                            <p> Review: {{review.review}}</p>   
                                        </div>
                                    </li> 
                                </ul>
                            </div>
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
      profilepic:
        "https://firebasestorage.googleapis.com/v0/b/unisos-bcf1f.appspot.com/o/defaultpfp.jpg?alt=media&token=5fd8c012-3d56-4771-be88-fa4ae98d3d32",
      imageData: null,
      bio: "",
      reviews: [],
      modules: [],
      notes: [],
      listing: [],
    };
  },
  methods: {
    fetchInfo: function () {
      db.collection("users")
        .doc(this.uid)
        .get()
        .then(
          (snapshot) => {
            var data = snapshot.data();
            this.name = data.name;
            this.email = data.email;
            this.university = data.university;
            this.profilepic = data.profilepic;
            this.bio = data.bio;
            this.reviews = data.reviews;
            this.modules = data.modules;
            // this.notes = data.selling;
          },
          (err) => {
            alert(err.message);
          }
        );
      db.collection("listing")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            var listingData = doc.data();
            if (listingData.userId == this.uid) {
              if (listingData.rating == null) {
                listingData.rating = "No rating yet";
              } else {
                listingData.reviewsData = listingData.reviewsData[1];
                // for (var key in listingData.reviewsData) {
                //     console.log(key)
                //     console.log(listingData.reviewsData)
                //     db.collection('users').doc(key).get().then(snapshot => {
                //     var userData = snapshot.data();
                //     console.log(listingData.reviewsData)
                //     listingData.reviewsData.name = userData.name;

                // })
                //}
              }
              listingData.show = false;
              this.listing.push(listingData);
            }
          });
        });
    },
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