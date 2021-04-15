<template>
    <div>
      <div id="localview">
        <div id="info">
          <router-link to="/mynotes" exact><img id="cross" src="../../assets/X.png"></router-link>
          <h1>{{title}}</h1>
          <button class="btn" v-on:click="toReview()">Review</button>
          <div v-show="showReview">
            <input type="radio" v-model="rating" value=1>
            <input type="radio" v-model="rating" value=2>
            <input type="radio" v-model="rating" value=3>
            <input type="text" v-model="review">
            <button class="btn" v-on:click="submit()">Submit</button>
          </div>
        </div>
        <div id="notes">
          <img width= 100% height= 100% :src= "imageURL"><br>     
        </div>
      </div>
      
    </div>
</template>

<script>
import { db } from '../../firebase'
import { auth } from '../../firebase'

export default {
  data() {
    return{
      userid: auth.currentUser.uid,
      username: "",
      noteId:this.$route.params.noteId,
      ownerid:"",
      title:"",
      imageURL:"",
      showReview: false,
      rating:"",
      review:""
    }
  },
  methods:{
    fetchItems: function() {
      db.collection('users').doc(this.userid).get().then(
        snapshot => {
          this.username = snapshot.data().name;
          var dict = snapshot.data().myNotes;
          this.imageURL = dict[this.noteId]["imageURL"];
          this.title = dict[this.noteId]["title"];
          this.ownerid = dict[this.noteId]["ownerid"];
        }
      );
    },
    toReview() {
      db.collection('listing').doc(this.noteId).get().then(
        snapshot => {
          var data = snapshot.data();
          if(typeof(data) === "undefined") {
            alert('Unable to review as listing has been deleted by the seller.')
          } else {
            var userid = auth.currentUser.uid;
            var reviewsData = data.reviewsData;
            if (reviewsData != null && userid in reviewsData) {
              alert("Already Reviewed!")
            } else {
              this.showReview = true;
            }
          }
        })
    },
    submit() {
      var cfm = confirm("Are you sure you want to submit this review?");
      if (cfm) {
        db.collection('listing').doc(this.noteId).get().then(
          snapshot => {
            var id = this.userid;
            var data = snapshot.data();
            var rating = data.rating;
            var reviewsData = data.reviewsData;
            if (rating == null) {
              rating = 0;
            }
            if (reviewsData == null) {
              reviewsData = {};
            }
            reviewsData[id] = {}
            reviewsData[id].rating = this.rating;
            reviewsData[id].review = this.review;
            reviewsData[id].name = this.username;
            var pair = [0,0]
            Object.keys(reviewsData).forEach(function(key) {
                pair[0] += 1;
                pair[1] += Number(reviewsData[key].rating)
            });
            rating = pair[1]/pair[0];
            console.log(rating);
            db.collection('listing').doc(this.noteId).update({rating:rating,reviewsData:reviewsData}).then(()=> {
              alert("Review Submitted!");
              this.$router.go( this.$router.path );
            });
          }
        );
      } else {
        alert("Review Submission Cancelled.");
      }
    }
  },
  created() {
    console.log(this.noteId)
    this.fetchItems();
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
#localview {
  display: flex;
  background: #47E4E4;
  overflow: auto;
  font-family: 'FredokaOne';
}
#cross {
    position: relative;
    width: 50px;
    height: 50px;
}
#info {
  flex: 1;
  margin-left: 30px;
  margin-top: 30px;
}
#notes {
  flex: 4;
  margin: 30px;
}
.btn {
    border-radius: 8px;
    border: none;
    padding: 10px 20px;
    background-color:black;
    color: white;
    font-family: 'FredokaOne';
    cursor: pointer;
    transition-duration: 0.4s;
    font-size: 20px;
    margin:5px;
    box-shadow: 0 0 4px #000000;
}
.btn:hover {
    background-color: white;
    color: black;
}
</style>