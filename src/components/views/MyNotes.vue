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
    <div id="lastviewed">
      

    </div>
    </div> 
    </div>
</template>

<script>

import db from "../../firebase.js"


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      modlevel:"",
      purchasedate:"",
      imageurl:""
    }
  },
  mounted() {
    db.collection('notes').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              let item = doc.data()
              this.imageurl.push(item.imageURL)
              alert("test")
            });
    })
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
/** #upload {
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

} **/
#content {
  background: #47E4E4;
  margin-top: 0%;
}
#bckgrnd {
position: absolute;
width: 1440px;
height: 900px;
left: 0px;
top: 130px;

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

  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 60px;
  display: flex;
  align-items: center;
  letter-spacing: -0.015em;
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
