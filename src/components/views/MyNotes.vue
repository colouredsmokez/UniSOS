<template>
    <div>

    <div id="content">
      <br>
      <img id="bckgrnd" src="../../assets/Rectangle.png">
      <img id="notesbox" src="../../assets/NotesRectangle.png">
      
      <img id="filterbox" src="../../assets/FilterRectangle.png">

      <p id="filtertext">Module Level</p>
      
      <input type="radio" id="lvl1" name="level" value="lvl1" v-model= "modlevel"/>
      <p id="label1">1k</p>
     
      <input type="radio" id="lvl2" name="level" value="lvl2" v-model= "modlevel"/> 
      <p id="label2">2k</p>

      <input type="radio" id="lvl3" name="level" value="lvl3" v-model= "modlevel"/> 
      <p id="label3">3k</p>

      <input type="radio" id="lvl4" name="level" value="lvl4" v-model= "modlevel"/> 
      <p id="label4">4k ++</p>

      
      <p id=purchasetxt>Purchase Date</p><br><br>
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
    
    <p id="mynotestxt">My Notes</p>
    <div class="lastviewed">
      <p id="lastviewedtxt">Last Viewed</p>
      <ul id="noteslist">
        <li id="notes" v-for="item in notes" v-bind:key="item.id">
          <div>
          <!--<img width= 110px height= 75px :src= "item.imageURL" v-on:click="route($event)" v-bind:id="item.id"/><br>-->
          <router-link to="/localview" exact><img width= 110px height= 75px :src= "item.imageURL"/></router-link><br>
          <h3>{{item.title}}</h3>
          </div>
        </li>
      </ul>

    </div>
    </div> 
    </div>
</template>

<script>

import { db } from "../../firebase.js"


export default {
  name: 'App',
  components: {
  },
  methods: {
    fetchItems: function() {
      db.collection('notes').get().then(snapshot => {
        let item = {}
        snapshot.docs.forEach(doc => {          
          item = doc.data()
          //alert(item.imageURL)
          this.notes.push(item)
        }); 
      }) 
    },
    route: function(event) {
          let doc_id = event.target.getAttribute("id");
          //console.log(doc_id);
          this.$router.push({ name: "mynotes", params: { id: doc_id } })
          
        }
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
/** * {
  box-sizing: border-box;
} **/
img {
  position: absolute;
  width: 255px;
  height: 71px;
  left: 22px;
  top: 31px;
}
#content {
  background: #47E4E4;
  margin-top: 0%;
}
#bckgrnd {
position: absolute;
width: 1440px;
height: 900px;
left: 0px;
top: 150px;

background: #47E4E4;
}
#filterbox{
  position: absolute;
  width: 325px;
  height: 707px;
  left: 60px;
  top: 265px;
  background: #C5ECEC;
  border-radius: 44px;
}
#filtertext {
  position: absolute;
  width: 237px;
  height: 235.45px;
  left: 150px;
  top: 300px;  
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
}
#label1, #label2, #label3, #label4, #label5, #label6 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
}
#lvl1 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 363px;
  line-height: 27px;
}
#label1 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 150px;
  top: 355px;
  line-height: 27px;
}
#lvl2 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 412px;
}
#label2 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 150px;
  top: 409px;
}
#lvl3 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 461px;  
}
#label3 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 150px;
  top: 458px;  
} 
#lvl4 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 510px;
}
#label4 {
  position: absolute;
  width: 50px;
  height: 37.29px;
  left: 150px;
  top: 508px;
}
#purchase {
  position: absolute;
  width: 236.5px;
  height: 142.99px;
  left: 104px;
  top: 640px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
#purchasetxt {
  position: absolute;
  width: 236.5px;
  height: 142.99px;
  left: 150px;
  top: 569.61px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
}
#ratingtxt {
  position: absolute;
  width: 236.5px;
  height: 186.67px;
  left: 150px;
  top: 734.09px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
}
#rating {
  position: absolute;
  width: 236.5px;
  height: 142.99px;
  left: 104px;
  top: 805px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
} 
#notesbox{
  position: absolute;
  width: 950px;
  height: 707px;
  left: 435px;
  top: 265px;
}
#mynotestxt {
  position: absolute;
  width: 286px;
  height: 57px;
  left: 475px;
  top: 250px;

  font-family: 'Fredoka One';
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 60px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
}
.lastviewed {
  position: absolute;
  width: 869.39px;
  height: 254px;
  left: 476px;
  top: 380px;
}
#lastviewedtxt {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
}
/**ul#noteslist li {
  display:inline;
}
ul {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}**/
#noteslist {
  width: 100%;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  background-color: #2BD7E2;
}
#notes {
  margin-top: 100px;
  text-align: center;
  flex-basis: 200px;
  min-width: 50%;
  max-width: 50%;

}
/** .noteslist {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  background-color: #2BD7E2;
}**/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/**li {
  flex-grow: 1;
  flex-basis: 150px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}**/
img {
  width: 220px;
  height: 150px;
}
</style>
