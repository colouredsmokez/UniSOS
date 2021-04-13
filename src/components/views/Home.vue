<template>
   <div id="home">
      <div id="banner">
        <img src= "../../assets/HomeBanner.png">
        
      </div>

      <div id="display">
          <h1 id="rectxt">Recommended for you</h1>
                <ul id="reclist">
                    <li id="reclisting" v-for="item in listingFiltered.sort(compare).slice(0,4)" v-bind:key="item" v-on:click="item.show = !item.show">
                        <div id="firstpart">
                            <h1>{{item.typeOfList}}</h1>
                            <div v-if="item.profilepic">
                                <button class="chat-button" v-bind:id="item.userId" v-on:click="toChat($event)"><div class="image-cropper">
                                    <img :src="item.profilepic" alt="profilepic" class="profile-pic">
                                </div></button>
                            </div>
                            <div v-else>
                                <button class="chat-button" v-bind:id="item.userId" v-on:click="toChat($event)"><div class="image-cropper">
                                    <img src="../../assets/defaultpfp.jpg" alt="profilepic" class="profile-pic">
                                </div></button>
                            </div>
                            <br>
                            <button class="profile-button" v-bind:id="item.userId" v-on:click="toProfile($event)">{{item.name}}</button>
                            <div v-if="item.rating==0"><p>no rating</p></div>
                            <div v-if="0<item.rating&&item.rating<=1"><p>*</p></div>
                            <div v-if="1<item.rating&&item.rating<=2"><p>**</p></div>
                            <div v-if="2<item.rating&&item.rating<=3"><p>***</p></div>
                        </div>
                        <div id="secondpart">
                            <h2>{{item.module}}</h2>
                        </div>
                        <div id="thirdpart">
                            <div v-if="item.userId != currentUser">
                                <button class="buy-button" v-bind:id="item.id" v-if="item.typeOfList=='Notes'" v-on:click="buy(item)">Buy</button>
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
  },
  
    toProfile: function(event) {
        let uid = event.target.getAttribute("id");
        alert(uid);
        this.$router.push({ name:'profile', params:{ uid:uid } });
    },
    toChat: function(event) {
        let uid = event.target.getAttribute("id");
        alert(uid);
        this.$router.push({ name:'chat', params:{ uid:uid } });

    },
    buy: function(item) {
        //alert(item.price);
            

        db.collection('users').doc(auth.currentUser.uid).get().then(
            snapshot => {
                //console.log(snapshot)
                var cfm = confirm("Buy notes for $" + item.price + "?")
                if (cfm) {
                    var notesUpdaing = snapshot.data().myNotes
                    //alert(notesUpdaing)
                    if (notesUpdaing == null) {
                        //alert("making new field")
                        notesUpdaing = {}
                    }
                    var id = item.id
                    
                    if (id in notesUpdaing) {
                        alert("Already Bought!")
                    } else {
                        
                        notesUpdaing[id] = {} 
                        notesUpdaing[id].imageURL = item.img;
                        notesUpdaing[id].title = item.name + "'s " + item.module + " notes"
                        notesUpdaing[id].ownerid = item.userId
                        db.collection('users').doc(auth.currentUser.uid).update(
                            {myNotes: notesUpdaing}
                        )
                    }
                } else {
                    alert("You cancelled your purchase.")
                }
                
            }
        )

            
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
#rectxt {
    margin-left: 30px;
}
#home, #banner {
  background:  #47E4E4;
  
  overflow: auto;
  font-family: 'FredokaOne';
}

/*img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 100%;
}*/

#banner img {
    object-fit: cover;
    width: 100%;
    height: max-content
}
#display {
    background:  #47E4E4;
    overflow: auto;
    font-family: 'FredokaOne';
    text-align: center;
}
#reclist {
  width: 90%;
  margin: 40px;
  font-family: 'FredokaOne';
  color: black;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding:10px;
}
ul#reclist li {
    display: inline;
    border-right:2px solid #C5ECEC;
    width: 23.2%;
    align-items: center;
}
ul#reclist li:last-child {
    border-right:none;
}
li {
  text-align: center;
  align-items: center;
  margin: 10px;
}
.reclisting {
    text-align: center;
    min-width: 60%;
    max-width: 60%;
    background: #47E4E4;
    margin: 10px;
}
.image-cropper {
  height: 150px;
  width: 150px;
  overflow: hidden;
  border-radius: 50%;
  align-content: center;
  /*margin-left: 70px;
  margin-right: 70px;*/
}
.profile-pic {
  object-fit: cover;
  height: 100%;
  width: 100%;
  align-content: center;
}
.chat-button {
    background-color: #C5ECEC;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border:none;
}
.buy-button {
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
.buy-button:hover {
    background-color: white;
}
#firstpart {
    align-items: center;
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
    cursor: pointer;
    text-align: center;
}
.profile-button:hover {
    background-color: black;
}

</style>