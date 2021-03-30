<template>
   <div>
      <div id= "listing-page">
          <div id="filter">
              <h2> Filter</h2>
              <h3>Type</h3>
              <input type="radio" v-model="type" value="notes">Notes
              <br>
              <input type="radio" v-model="type" value="tutor">Tutor
              <br>
              <h3>Rating</h3>
              <input type="radio" v-model="rating" value="***">***
              <br>
              <input type="radio" v-model="rating" value="**">**
              <br>
              <input type="radio" v-model="rating" value="*">*
            </div>
            <div v-show="type == 'notes'">
                <h1>type is chosen</h1>
            </div>
        </div>
        <h1>Listings</h1>
        <router-link class="chat" to="/chat"><img src = "../../assets/chaticon.png"></router-link>
      </div>
    
  
</template>
<script>
export default {
    data() {
        return{
            type:"",
            rating:""
        }
    }
}

</script>


<style scoped>
#listing-page {
    background:  #47E4E4;
    margin-top: 0%;
}

#filter {
    margin-left: 1.5%
}

h2 {
    margin:0%
}

h3 {
    margin:0%
}
.chat {
  width: auto;
  height: 40%;
}
</style>