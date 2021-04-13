<template>
    <div>

    <div id="content">
      <br>
      <div class="flex-container">
      <!--  <div class="filter">

      <img id="bckgrnd" src="../../assets/Rectangle.png">
      <img id="notesbox" src="../../assets/NotesRectangle.png">
      
      <img id="filterbox" src="../../assets/FilterRectangle.png">

        <p id="filtertxt">Module Level</p>

        <div id="level">
          <input type="radio" id="lvl1" name="level" value="lvl1" v-model= "modlevel"/>
          <label for="lvl1">1k</label> <br><br> 
     
          <input type="radio" id="lvl2" name="level" value="lvl2" v-model= "modlevel"/> 
          <label for="lvl2">2k</label> <br><br>

          <input type="radio" id="lvl3" name="level" value="lvl3" v-model= "modlevel"/> 
          <label for="lvl3">3k</label> <br><br>

          <input type="radio" id="lvl4" name="level" value="lvl4" v-model= "modlevel"/> 
          <label for="lvl4">4k++</label> <br><br>

        </div>
    

      
        <p id=purchasetxt>Purchase Date</p>
          <div id="purchase">
          <input type="radio" id="recent" name="purchasedate" value="recent" v-model= "purchasedate"/>
          <label for="recent">Most Recent</label> <br><br> 

          <input type="radio" id="old" name="purchasedate" value="old" v-model= "purchasedate"/>
          <label for="old">Oldest</label> <br><br>
        
          </div>

        <p id="ratingtxt">Rating</p>
          <div id="rating">
            <input type="radio" id="***" name="rating" value="***" v-model= "rating"/>
            <label for="***">***</label> <br><br>

            <input type="radio" id="**" name="rating" value="**" v-model= "rating"/>
            <label for="**">**</label> <br><br>

            <input type="radio" id="*" name="rating" value="*" v-model= "rating"/>
            <label for="*">*</label> <br><br>

          </div> 
      </div>-->
    
      <div class="notes">
        <p id="mynotestxt">My Notes</p>
        <div id="lastviewed">
          <p id="lastviewedtxt">Purchased</p>
          <ul id="noteslist">
            <li class="notesli" v-for="item in notes" v-bind:key="item.id">
              <div>
                <br>
                <img width= 110px height= 75px :src= "item.imageURL" v-on:click="route($event)" v-bind:id="item.id"><br>
                <br>
                <!-- <button class="notes-button" v-bind:id="item.id" v-on:click="route($event)"><img width= 110px height= 75px :src= "item.imageURL"/></button> -->
                
                <!-- <router-link to="/localview" exact><img width= 110px height= 75px :src= "item.imageURL"/></router-link><br> -->
                <h3>{{item.title}}</h3>
                
                
              </div>
            </li>
          </ul>
        </div>
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
  margin-top: 0%;
  overflow: auto;
  font-family: 'FredokaOne';
}
.flex-container {
  display: flex;
  margin: auto;
  height: 80vh;
}
/*.filter {
  flex: 1;
  background-position: center;
  background-size: cover;
  height: 90%;
  margin-left: 50px;
  margin-right: 30px;
  margin-top: 10px;
  border-radius: 25px;
  background-color: #C5ECEC;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 15px;
  font-weight: bold;
}*/
.notes {
  flex: 1;
  background-position: center;
  background-size: cover;
  height: 90%;
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
  padding: 0;
  /*background-color: #47E4E4;*/
  border-radius: 25px;
}
.notesli {
  text-align: center;
  min-width: 33%;
  max-width: 33%;
  background: #47E4E4;
  margin: 10px;
  cursor:pointer;
  transition-duration: 0.4s;
}
.notesli:hover{
  background-color: rgba(0, 0, 0, 0.63);
  color: white;
}
.notesli:first-child {
  margin-left: 0px;
}
.notesli:last-child {
  margin-right: 0px;
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
ul#noteslist li {
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
