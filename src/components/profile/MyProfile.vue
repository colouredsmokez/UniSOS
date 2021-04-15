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
            <!-- Bio -->
            <div id="bio">
                <p> Bio </p>
                <span> {{ bio }} </span>
            </div>

            <!-- Tutor Info -->
            <div class="list">
                <hr>
                <h3> Modules I'm Taking </h3> 
                <hr>
                <ul>
                    <li class="list-item" v-for="mod in modules" v-bind:key="mod">
                        <div>
                            <span>{{mod}}</span>
                        </div>
                    </li>
                </ul>
                
            </div>

            <!-- Notes Info -->
            <div class="list">
                <hr>
                <h3> Listings </h3>
                <ul>
                    <li class="list-item" v-for="n in listing" v-bind:key="n.id" v-on:click="n.show = !n.show" >
                        <div>
                            <p>Type of listing : {{ n.typeOfList }}</p>
                            <p>Module : {{ n.module }}</p>
                            <p>Rating : {{n.rating}}</p>
                            <ul class="list-item" v-for="review in n.reviewsData" v-bind:key="review"  v-show="n.show">
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
                <hr>
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
        uid: auth.currentUser.uid,
        name: '',
        email: '',
        university: '',
        profilepic: "https://firebasestorage.googleapis.com/v0/b/unisos-bcf1f.appspot.com/o/defaultpfp.jpg?alt=media&token=5fd8c012-3d56-4771-be88-fa4ae98d3d32",
        imageData: null,
        bio: '',
        reviews: [],
        modules: [],
        notes: [],
        listing: []
    };
},
methods: {
    fetchInfo: function() {
        db.collection('users').doc(this.uid).get().then(
            snapshot => {
                var data = snapshot.data();
                this.name = data.name;
                this.email = data.email;
                this.university = data.university;
                this.profilepic = data.profilepic;
                this.bio = data.bio;
                this.reviews = data.reviews;
                this.modules = data.modules;
                this.notes = data.selling;
            },
            err => {
                alert(err.message)
            }
        );
        db.collection('listing').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    var listingData = doc.data();
                    if (listingData.userId == this.uid) {
                        if(listingData.rating == null) {
                            listingData.rating = "No rating yet"
                        } else {
                            listingData.reviewsData = listingData.reviewsData[1]
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
                        this.listing.push(listingData)
                    }
                });
        })
                    
                
    },
  },
  created() {
    this.fetchInfo();
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
.body{
    flex: 9;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: #C5ECEC;
    border-radius: 25px;
    box-shadow: 0 0 10px #000000;
    display:flex;
    padding: 20px;
}

.header {
    overflow: hidden;
    position: relative;
    background: black;
    font-family: 'FredokaOne';
    text-align: center;
    padding: 20px;
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
.list {
    margin: auto;
    padding: 20px;
    text-align: center;
    float: right;
    width: 65%;
    border: none;
}
.list-item {
    list-style-type: none;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 20px;
}
#btn {
    cursor: pointer;
    font-size: 10px;
}
#bio p {
    font-family: 'FredokaOne';
    font-size: 24px;
}
#bio {
    float: left;
    width: 45%;
    white-space:pre-line;
    padding: 35px;
}



</style>