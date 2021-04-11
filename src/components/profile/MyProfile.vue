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
                <h3> Modules </h3> 
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
                <h3> Notes </h3>
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
        classes: [],
        notes: []
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
                this.classes = data.tutoring;
                this.notes = data.selling;
            },
            err => {
                alert(err.message)
            }
        );
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
    background-color: whitesmoke;
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
    text-align: center;
}
</style>