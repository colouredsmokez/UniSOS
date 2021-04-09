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
#localview {
  background: #47E4E4;
  margin-top: 0%;
  overflow: auto;
}
#cross {
    position: relative;
    width: 50px;
    height: 50px;
    margin-left: 40px;
    margin-top: 40px;
}
#info {
  width:20%;
  float:left;
}

#notes {
  width: 80%;
  float:left;
}
</style>