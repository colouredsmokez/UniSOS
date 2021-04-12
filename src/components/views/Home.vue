<template>
   <div>
      <div id="home">
        <img src= "../../assets/HomeBanner.png">
        <h1>Recommends</h1>
      </div>
      <div id="display">
                <ul>
                    <li id="listing" v-for="item in listingFiltered.sort(compare).slice(0,4)" v-bind:key="item" v-on:click="item.show = !item.show">
                        <div id="firstpart">
                            <h1>{{item.typeOfList}}</h1>
                            <div v-if="item.profilepic">
                                <div class="image-cropper">
                                    <img :src="item.profilepic" alt="profilepic" class="profile-pic">
                                </div>
                            </div>
                            <div v-else>
                                <div class="image-cropper">
                                    <img src="../../assets/defaultpfp.jpg" alt="profilepic" class="profile-pic">
                                </div>
                            </div>
                            <br>
                            <button class="profile-button" v-bind:id="item.userId" v-on:click="toProfile($event)">{{item.name}}</button>
                            <p>{{item.rating}}</p>
                        </div>
                        <div id="secondpart">
                            <h2>{{item.module}}</h2>
                            <p>Took in: {{item.took_in}}</p>
                            <p>Final grade: {{item.grade}}</p>
                            <p v-if="item.typeOfList=='Notes'"> Price: ${{item.price}}<p>
                            <p>{{item.addInfo}}</p>
                        </div>
                        <div id="thirdpart">
                            <div v-if="item.userId != currentUser">
                                <button class="chat-button" v-bind:id="item.id" v-if="item.typeOfList=='Notes'" v-on:click="buy(item)">Buy</button>
                                <button class="chat-button" v-bind:id="item.userId" v-on:click="toChat($event)"><i class="fa fa-comment" aria-hidden="true"></i> Chat</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
    </div>
  
</template>

<script>
import { db } from '../../firebase'
import { auth } from '../../firebase'

export default {

  data() {
        return{
            currentUser: auth.currentUser.uid,
            type:'',
            rating:'',
            listing:[],
            listingFiltered:[],
            users:[],
            modulesTaking:[]
        }
    },
  methods:{
    fetchItems:function() {
        
        db.collection('users').doc(auth.currentUser.uid).get().then(
        snapshot => {
          this.modulesTaking = snapshot.modules
          
        })
        var listOfData = new Array();
        db.collection('listing').get().then(
            (querySnapShot) => {
                
                querySnapShot.forEach(
                    doc => {
                        var listingData = doc.data();
                        db.collection('users').doc(listingData.userId).get().then(
                            snapshot => {
                                var userData = snapshot.data();
                                // if (modulesTaking.include(listingData.module)) {
                                //     listingData.weight = 5;
                                // } else {
                                //     listingData.weight = 0;
                                // }
                                listingData.name = userData.name;
                                listingData.email = userData.email;
                                listingData.university = userData.university;
                                listingData.profilepic = userData.profilepic;
                                listingData.bio = userData.bio;
                                listingData.id = doc.id;
                                
                                console.log(listingData)
                                this.listing.push(listingData);
                                listOfData.push(listingData)
                                
                            },
                            err => {
                                alert(err.message)
                            }
                        );
                    },
                    err => {
                        alert(err.message)
                    }
                ).then(()=> {
            
        });
            },
            err => {
                alert(err.message)
            }    
        );
        
        this.listingFiltered = this.listing;
        
  },

  compare:function(a,b){
      var modulesTaking = ["BT3103"]
      console.log("testing between")
      console.log(a)
      console.log(b)
      if (modulesTaking.includes(a.module) && !(modulesTaking.includes(b.module))) {
          console.log("This is tested 1")
          return -1
      } else if (modulesTaking.includes(b.module) && !(modulesTaking.includes(a.module))) {
          console.log("This is tested 2")
          return 1
          
      } else {
          console.log("This is tested 0")
          return 0

      }
  }
    
  },
  created() {
        this.fetchItems();
        
    }
  

}
</script>

<style scoped>
#home {
  background:  #47E4E4;
  margin-top: 0%;
  overflow: auto;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>