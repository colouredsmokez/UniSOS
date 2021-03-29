<template>
    <div>
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
      <p id="filtertext">Module Level Test</p>

    </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
#content {
  background-color: #47E4E4;
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
#filtertext {
  position: absolute;
  width: 237px;
  height: 235.45px;
  left: 104px;
  top: 313.11px;  
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
