<template>
   <div>
      <div id= "listing-page">
          <br>
          <div id="filter">
              <h2> Filter</h2>
              <h3>Type</h3>
              <input type="radio" v-on:change="filter()" v-model="type" value="Notes">Notes
              <br>
              <input type="radio" v-on:change="filter()" v-model="type" value="Tutor">Tutor
              <br>
              <h3>Rating</h3>
              <input type="radio" v-on:change="filter()" v-model="rating" value="***">***
              <br>
              <input type="radio" v-on:change="filter()" v-model="rating" value="**">**
              <br>
              <input type="radio" v-on:change="filter()" v-model="rating" value="*">*
            </div>
            <div v-show="type == 'notes'">
                <h1>type is chosen</h1>
            </div>
        
            <div id = "display">
                <ul>
                    <li v-for="item in listingFiltered" v-bind:key="item.name" v-on:click="item.show = !item.show">
                        <section>
                            <div id="firstpart">
                                <h1 id="type">{{item.typeOfList}}</h1>
                                <h2 id= "tutor">{{item.name}}</h2>
                                <p>{{item.rating}}</p>
                            </div>
                            <div id="secondpart">
                                <h2 id= "module">{{item.module}}</h2>
                                <p id = "addInfo">{{item.addInfo}}</p>
                            </div>
                            <router-link class="chat" to="/chat"><img src = "../../assets/chaticon.png"></router-link>
                            <!-- <img v-bind:src="item.image" v-show="item.show"/> -->
                        </section>
                        <hr>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
  
</template>
<script>
import db from '../../firebase.js'

export default {
    data() {
        return{
            type:'',
            rating:"",
            listing:[],
            listingFiltered:[]
        }
    },
    methods:{
        fetchItems:function(){
            db.collection('listing').get().then((querySnapShot)=> {
                    querySnapShot.forEach(doc=>{
                    
                    this.listing.push(doc.data())
                })
            })
        
            this.listingFiltered = this.listing;
        }
        ,
        filter:function() {
            this.listingFiltered = []
            for (var list of this.listing) {
                
                if ((this.type == list.typeOfList|| this.type == '')&&(this.rating == list.rating|| this.rating == '')) {
                    this.listingFiltered.push(list)
                }
            }
            
        }
    },
    created() {
        this.fetchItems();
    }
    

}

</script>


<style scoped>
#listing-page {
    background:  #47E4E4;
    margin-top: 0%;
    overflow: auto;
}

ul {
    list-style-type: none;
}

#filter {
    position:sticky;
    margin-left: 1.5%;
    width:15%;
    float:left;
}

h2 {
    margin:0%
}

h3 {
    margin:0%
}

#display {
    width:80%;
    float: left;
    background-color: whitesmoke;
    border-radius: 25px;
}
.chat {
  width: auto;
  height: 40%;
}
#firstpart{
    width:20%;
    float: left;
}

#secondpart{
    width:40%;
    float:left;
}

section:after {
  content: "";
  display: table;
  clear: both;
}

hr {
  border: 0;
  clear:both;
  display:block;
  width: 96%;               
  background-color:black;
  height: 1px;
}

.chat{
    float: right;
    margin-right: 120px;
}
</style>