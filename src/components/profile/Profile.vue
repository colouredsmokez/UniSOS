<template>
    <div class="profile">
        <!--Banner-->
        <div class="header">
            <img class="header-bg" src='../../assets/ProfileBanner.png' alt="profile banner">
            <div class="header-content">
                <!-- Profile Pic -->
                <img class="header-content-pic" :src="profilepic" alt="profile pic">
                <!-- User Info -->
                <h3>{{ name }}</h3>
                <div>{{ email }}</div>
                <div>{{ university }}</div>
            </div>
        </div>

            <!-- Bio -->
            <div></div>

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

export default {
data() {
    return {
        uid: this.$route.params.uid,
        name: '',
        email: '',
        university: '',
        profilepic: null,
        imageData: null,
        bio: '',
        reviews: [],
        tutoring: [],
        selling: []
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
    }
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
.profile {
    margin: auto;
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
.header-content-pic {
    border-radius: 50em;
    height: 200px;
    width: 200px;
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