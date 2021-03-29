<template>
  <div id="app">
    <body>

    <header>
    <img alt="UniSOS logo" src="../../assets/UniSOSlogo.png">
    <img id="profile" src="../../assets/Profile.png">
    </header>
    <br>

    <div class="navbar">
    <img id="navbckgrnd" src="../../assets/Navigation.png">
    <img id="reco" src="../../assets/Recommendations.png">
    <img id="listings" src="../../assets/Listings.png">
    <img id="upload" src="../../assets/Upload.png">
    <img id="mynotes" src="../../assets/MyNotes.png">
    </div><br>
    <div id="content">
      <img id="bckgrnd" src="../../assets/Rectangle.png">
      <img id="notesbox" src="../../assets/NotesRectangle.png">
      <img id="filterbox" src="../../assets/FilterRectangle.png">

      <p id="level">Module Level</p>
      <input type="radio" id="lvl1" value="lvl1" v-model= "modlevel"/>
      <label for="lvl1" >Label</label>
     
     <input type="radio" id="lvl2" name="level" value="lvl2" v-model="modlevel"/> 
      <label for="lvl2">2k</label>

      <!-- <input type="radio" id="lvl3" name="level" value="lvl3" v-model="modlevel"/> 
      <label for="lvl3">3k</label>
      <input type="radio" id="lvl4" name="level" value="lvl4" v-model="modlevel"/> 
      <label for="lvl4">4k ++</label>

      <span>Picked: {{modlevel}}</span>
      -->

    </div>

    <!-- <router-view></router-view> -->
    <myNotes></myNotes>

    </body>
  </div>
</template>

<script>
import MyNotes from './MyNotes.vue'

export default {
  components: {
    MyNotes
  },
  data() {
    return{
      modlevel: ""
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
header {
  background-color: white;
  padding: 30px;
  text-align: center;
}
img {
  position: absolute;
  width: 255px;
  height: 71px;
  left: 22px;
  top: 31px;
}
#navbckgrnd {
  position: absolute;
  width: 1440px;
  height: 76px;
  left: 0px;
  top: 130px;
}
#reco {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 570px;
  top: 143px;
  color: #5ABAC0;
}
#listings {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 670px;
  top: 143px;
  color: #5ABAC0;
}
#upload {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 770px;
  top: 143px;
  color: #5ABAC0;
}
#mynotes {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 870px;
  top: 143px;
  color: #000000;
}
#profile {
  position: absolute;
  width: 150px;
  height: 75px;
  left: 1199px;
  top: 31px;

}
#bckgrnd {
position: absolute;
width: 1440px;
height: 818px;
left: 0px;
top: 206px;

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
#level {
  position: absolute;
  width: 237px;
  height: 235.45px;
  left: 104px;
  top: 313.11px;  
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  font-size: 20px;
}
#lvl1 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 362.09px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  line-height: 27px;
}
#lvl2 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 411.82px;
}
#lvl3 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 461.54px;  
}
#lvl4 {
  position: absolute;
  width: 32.85px;
  height: 37.29px;
  left: 104px;
  top: 411.82px;
}
#label1 {
  position: absolute;
  width: 187.23px;
  height: 37.29px;
  left: 153.27px;
  top: 362.09px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;

color: #000000;
}
#notesbox{
  position: absolute;
  width: 950px;
  height: 707px;
  left: 435px;
  top: 265px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
