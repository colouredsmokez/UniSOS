<template>
    <div>
      <div id= "localview">
        <div id = "info">
          <router-link to="/mynotes" exact><img id="cross" src="../../assets/X.png"></router-link>
          <h1>{{title}}</h1>
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
      noteId:this.$route.params.noteId,
      imageURL:"",
      title:"",
      ownerid:"",
      note:""
    }
  },
  methods:{
    fetchItems: function() {
      db.collection('users').doc(auth.currentUser.uid).get().then(
        snapshot => {
          var dict = snapshot.data().myNotes
          this.imageURL = dict[this.noteId]["imageURL"]
          this.title = dict[this.noteId]["title"]
          this.ownerid = dict[this.noteId]["ownerid"]
          this.note = this.noteId
        })
    },
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
  margin-top: 0%;
  overflow: auto;
  font-family: 'FredokaOne';
}
#cross {
    position: relative;
    width: 50px;
    height: 50px;
}
#info {
  width:20%;
  float:left;
  flex: 1;
  margin-left: 30px;
  margin-top: 30px;
}

#notes {
  flex: 4;
  width: 80%;
  float:left;
  margin: 30px;
}
</style>