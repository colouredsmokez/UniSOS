<template>
   <div>
      <div id="home">
        <img src= "../../assets/HomeBanner.png">
        <h1 id="rectxt">Recommends</h1>
      </div>
      <div id="display"><hr>
                <ul id="reclist">
                    <li class="reclisting" v-for="item in listingFiltered" v-bind:key="item" v-on:click="item.show = !item.show">
                        <div>
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
                        </div>
                        <div id="thirdpart">
                            <div v-if="item.userId != currentUser">
                                <button class="chat-button" v-bind:id="item.id" v-if="item.typeOfList=='Notes'" v-on:click="buy(item)">Buy</button>
                                <button class="chat-button" v-bind:id="item.userId" v-on:click="toChat($event)"><i class="fa fa-comment" aria-hidden="true"></i> Chat</button>
                            </div>
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
            users:[]
        }
    },
  methods:{
    fetchItems:function() {
        db.collection('listing').get().then(
            (querySnapShot) => {
                querySnapShot.forEach(
                    doc => {
                        var listingData = doc.data();
                        db.collection('users').doc(listingData.userId).get().then(
                            snapshot => {
                                var userData = snapshot.data();
                                listingData.name = userData.name;
                                listingData.email = userData.email;
                                listingData.university = userData.university;
                                listingData.profilepic = userData.profilepic;
                                listingData.bio = userData.bio;
                                listingData.id = doc.id;
                                this.listing.push(listingData);
                            },
                            err => {
                                alert(err.message)
                            }
                        );
                    },
                    err => {
                        alert(err.message)
                    }
                );
            },
            err => {
                alert(err.message)
            }    
        );
        
        this.listingFiltered = this.listing;
  }
  },
  created() {
        this.fetchItems();
        //this.fetchUsers();
    }
  

  //get user.modules
  //for each listing, if module in user.modules, add to list

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
#rectxt {
    margin-left: 30px;
}
#home {
  background:  #47E4E4;
  margin-top: 0%;
  overflow: auto;
  font-family: 'FredokaOne';
}
#display {
    background:  #47E4E4;
    overflow: auto;
    font-family: 'FredokaOne';
}
#img {
    object-fit: cover;
    max-width: 100%;
    max-height: 100vh;
}
#reclist {
  width: 90%;
  margin: 40px;
  font-family: 'FredokaOne';
  color: black;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
ul#reclist li {
    display: inline;
}
li {
  text-align: center;
  margin: 10px;
}
.reclisting {
    text-align: center;
    min-width: 20%;
    max-width: 20%;
    background: #47E4E4;
    margin: 10px;
}
.image-cropper {
  height: 90px;
  width: 90px;
  overflow: hidden;
  border-radius: 50%;
  align-content: center;
}
.profile-pic {
  object-fit: cover;
  height: 100%;
  width: 100%;
  align-content: center;
}
</style>