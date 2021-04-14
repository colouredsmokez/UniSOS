<template>
    <div id="content">
      <br>
      <div class="flex-container">
        <div class="notes">
          <p id="mynotestxt">My Notes</p>
          <div id="lastviewed">
            <p id="lastviewedtxt">Purchased</p>
            <ul id="noteslist">
              <li class="notesli" v-for="item in notes" v-bind:key="item.id">
                <div>
                  <br>
                  <img :src= "item.imageURL" v-on:click="route($event)" v-bind:id="item.id"><br>
                  <br>
                  <h3>{{item.title}}</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import { db } from "../../firebase.js"
import { auth } from '../../firebase'


export default {
  name: 'App',
  components: {
  },
  methods: {
    fetchItems: function() {
      db.collection('users').doc(auth.currentUser.uid).get().then(
        snapshot => {
          // console.log(snapshot)
          var dict = snapshot.data().myNotes
          for (var key in dict) {
            // console.log(key)
            // console.log(dict[key])
            var newDict = dict[key]
            newDict["id"] = key
            // console.log(newDict)
            this.notes.push(newDict)
          }
          
        })
    },
    route: function(event) {
      let noteId = event.target.getAttribute("id");
      console.log(noteId)
      this.$router.push({ name: "localview", params: { noteId: noteId } })
    },
  },
  data() {
    return {
      modlevel:"",
      purchasedate:"",
      notes:[]
    }
  },
  created() {
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
#content {
  background: #47E4E4;
  overflow: auto;
  font-family: 'FredokaOne';
}
.flex-container {
  display: flex;
  margin: auto;
}
.notes {
  flex: 1;
  background-position: center;
  background-size: cover;
  height:auto;
  width: 100%;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 10px;
  border-radius: 25px;
  background-color: whitesmoke;
  box-shadow: inset 0 0 5px #1b1b1b;
  
}
#noteslist {
  width: 90%;
  margin: 40px;
  font-family: 'FredokaOne';
  color: black;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  border-radius: 25px;
}
#noteslist:last-child{
  border-bottom: none;
}
.notesli {
  text-align: center;
  min-width: 30%;
  max-width: 33%;
  background: #47E4E4;
  margin: 10px;
}
img{
  cursor:pointer;
}

#filtertxt, #level, #purchasetxt, #purchase, #ratingtxt, #rating {
  margin-left: 30px;
  margin-top: 30px;
}
#mynotestxt {
  margin-left: 40px;
  margin-top: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 60px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
}
#lastviewedtxt {
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  margin-top: 60px;
  margin-left: 40px;
}
#noteslist li {
  display:inline;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li {
  text-align: center;
  border: 1px solid #C5ECEC;
  border-radius: 5%;
  margin: 10px;
}
img {
  width: 220px;
  height: 150px;
}
</style>
