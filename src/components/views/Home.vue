<template>
    <div id="home">
        <div id="banner">
            <img src= "../../assets/HomeBanner.png" alt="banner">
        </div>
        <div id="display">
            <h1>Recommended for you</h1>
            <button v-show="recommended" class="recbutton" v-on:click="sortList">Get Recomendation</button>
            <div id="overflow">
                <ul class="reclist">
                    <li class="reclisting" v-for="item in listingFiltered.slice(0,5)" v-bind:key="item.id" v-on:click="item.show = !item.show">
                        <div>
                            <h1>{{item.typeOfList}}</h1>
                            <div v-if="item.profilepic">
                                <div class="image-cropper">
                                    <img class="profile-pic" :src="item.profilepic" v-bind:id="item.id" v-on:click="toChat($event)" alt="profilepic">
                                </div>
                            </div>
                            <div v-else>
                                <div class="image-cropper">
                                    <img class="profile-pic" src= "../../assets/defaultpfp.jpg" v-bind:id="item.id" v-on:click="toChat($event)" alt="profilepic">
                                </div>
                            </div>
                            <br>
                            <button class="profile-button" v-bind:id="item.userId" v-on:click="toProfile($event)">{{item.name}}</button>
                            <br><br>
                            <div v-if="item.rating==0 || item.rating==null">
                                <p>No rating yet</p>
                            </div>
                            <div v-if="0<item.rating&&item.rating<=1">
                                <img class="inline" src="../../assets/goldstar.png" alt="star">
                                <img class="inline" src="../../assets/blackstar.png" alt="star">
                                <img class="inline" src="../../assets/blackstar.png" alt="star">
                            </div>
                            <div v-if="1<item.rating&&item.rating<=2">
                                <img class="inline" src="../../assets/goldstar.png" alt="star">
                                <img class="inline" src="../../assets/goldstar.png" alt="star">
                                <img class="inline" src="../../assets/blackstar.png" alt="star">
                            </div>
                            <div v-if="2<item.rating&&item.rating<=3">
                                <img class="inline" src="../../assets/goldstar.png" alt="star">
                                <img class="inline" src="../../assets/goldstar.png" alt="star">
                                <img class="inline" src="../../assets/goldstar.png" alt="star">
                            </div>
                            <div>
                                <h2>{{item.module}}</h2>
                            </div>
                            <div v-if="item.userId != currentUser">
                                <button class="buy-button" v-bind:id="item.id" v-if="item.typeOfList=='Notes'" v-on:click="buy(item)">Buy</button>
                            </div>
                            <br>
                        </div>
                    </li>
                </ul>
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
            currentUser: auth.currentUser.uid,
            type:'',
            rating:'',
            listing:[],
            listingFiltered:[],
            users:[],
            modulesTaking:[],
            recommended: true
        }
    },
    methods:{
        fetchItems:function() {
            db.collection('users').doc(auth.currentUser.uid).get().then(snapshot => {
                this.modulesTaking = snapshot.data().modules
            });
            db.collection('listing').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    var listingData = doc.data();
                    db.collection('users').doc(listingData.userId).get().then(snapshot => {
                        var userData = snapshot.data();
                        listingData.name = userData.name;
                        listingData.email = userData.email;
                        listingData.university = userData.university;
                        listingData.profilepic = userData.profilepic;
                        listingData.bio = userData.bio;
                        listingData.id = doc.id;
                        // console.log(listingData)
                        this.listing.push(listingData);                      
                    },
                    err => {
                        alert(err.message)
                    });
                },
                err => {
                    alert(err.message)
                });
            },
            err => {
                alert(err.message)
            });
            
        },
        compare:function(a,b){
            if (a.userId == this.currentUser && !(b.userId == this.currentUser)) {
                return 1
            } else if (b.userId == this.currentUser && !(a.userId == this.currentUser)) {
                return -1
            } else if (this.modulesTaking.includes(a.module) && !(this.modulesTaking.includes(b.module))) {
                return -1
            } else if (this.modulesTaking.includes(b.module) && !(this.modulesTaking.includes(a.module))) {
                return 1
            } else if (a.advertise != null && b.advertise ==null) {
                return -1 
            } else if (b.advertise != null && a.advertise ==null){
                return 1
            } else if (a.rating > b.rating || (a.rating!=null && b.rating == null)){
                return -1
            } else if (b.rating > a.rating || (b.rating!=null && a.rating == null)) {
                return 1
            } else {
                return 0
            }
        },
        sortList: function(){
            this.listingFiltered = this.listing.sort(this.compare);
            this.recommended = false;
        },
        toProfile: function(event) {
            let uid = event.target.getAttribute("id");
            this.$router.push({ name:'profile', params:{ uid:uid } });
        },
        toChat: function(event) {
            let id = event.target.getAttribute("id");
            this.$router.push({ name:'chat', params:{ id:id } });
        },
        buy: function(item) {
            db.collection('users').doc(auth.currentUser.uid).get().then(snapshot => {
                var myNotes = snapshot.data().myNotes;
                if (myNotes == null) {
                    myNotes = {}
                }
                var id = item.id;
                if (id in myNotes) {
                    alert("Already Bought!")
                } else {
                    var cfm = confirm("Buy notes for $" + item.price + "?");
                    if (cfm) {
                        this.$router.push({ name:'payment', params:{itemid:item.id,notes:true} });
                    }
                }
            });
        }
    },
    created() {
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
#home, #banner, #display{
    background:  #47E4E4;
    font-family: 'FredokaOne';
    min-width: 1000px;
    text-align: center;
}
#banner img {
    object-fit: cover;
    width: 100%;
    height: max-content
}
#overflow {
    overflow-x: auto;
}
.recbutton {
    border-radius: 8px;
    border: none;
    padding: 10px 20px;
    background-color:#C5ECEC;
    color: black;
    font-family: 'FredokaOne';
    cursor: pointer;
    transition-duration: 0.4s;
    font-size: 20px;
    margin:5px;
}
.recbutton:hover {
    background-color: white;
}
.reclist {
  width: 100%;
  display: flex;
  list-style-type: none;
}
.reclisting {
    display: inline;
    border-right: solid #C5ECEC thin;
    background: #47E4E4;
    padding: 0 100px;
}
.reclisting:last-child {
    border-right:none;
}
.image-cropper {
  height: 150px;
  width: 150px;
  overflow: hidden;
  border-radius: 50%;
}
.profile-pic {
  object-fit: cover;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.profile-button {
    font-family: 'FredokaOne';
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    color: white;
    border: none;
    padding: 5px;
    background-color: #25abb4;
    text-align: center;
    align-self: center;
}
.profile-button:hover {
    background-color: black;
}
.buy-button {
    border-radius: 8px;
    border: none;
    padding: 5px 20px;
    background-color:#C5ECEC;
    color: black;
    font-family: 'FredokaOne';
    cursor: pointer;
    transition-duration: 0.4s;
    font-size: 16px;
    margin:5px;
}
.buy-button:hover {
    background-color: white;
}
.inline {
  display: inline-block;
  vertical-align: middle;
  height:27px;
  width:27px;
}
</style>