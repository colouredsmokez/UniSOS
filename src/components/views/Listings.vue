<template>
    <div>
        <div id="listing-page">
            <div id="filter">
                <h1><i class="fa fa-filter" aria-hidden="true"></i> Filter</h1>
                <br>
                <h3>Type</h3>
                <input type="radio" v-on:change="filter()" v-model="type" value="Notes">Notes<br>
                <input type="radio" v-on:change="filter()" v-model="type" value="Tutor">Tutor<br>
                <br><br>
                <h3>Rating</h3>
                <input type="radio" v-on:change="filter()" v-model="rating" value="***">***<br>
                <input type="radio" v-on:change="filter()" v-model="rating" value="**">**<br>
                <input type="radio" v-on:change="filter()" v-model="rating" value="*">*<br>
            </div>

            <div v-show="type == 'notes'">
                <h1>type is chosen</h1>
            </div>

            <div id="display">
                <ul>
                    <li id="listing" v-for="item in listingFiltered" v-bind:key="item.id" v-on:click="item.show = !item.show">
                        <div id="firstpart">
                            <h1>{{item.typeOfList}}</h1>
                            <div v-if="item.pfp">
                                <div class="image-cropper">
                                    <img :src="item.pfp" alt="profilepic" class="profile-pic">
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
                            <p>{{item.addInfo}}</p>
                        </div>
                        <div id="thirdpart">
                            <div v-if="item.userId != currentUser">
                                <button class="chat-button" v-bind:id="item.userId" v-on:click="toChat($event)"><i class="fa fa-comment" aria-hidden="true"></i> Chat</button>
                            </div>
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
            listingFiltered:[]
        }
    },
    methods: {
        fetchItems:function() {
            db.collection('listing').get().then((querySnapShot)=> {
                querySnapShot.forEach(doc=>{
                    this.listing.push(doc.data());
                });
            });
            this.listingFiltered = this.listing;
        },
        filter:function() {
            this.listingFiltered = []
            for (var list of this.listing) {
                if ((this.type == list.typeOfList || this.type == '') && (this.rating == list.rating || this.rating == '')) {
                    this.listingFiltered.push(list);
                }
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
#listing-page {
    background:  #47E4E4;
    display: flex;
    padding: 20px 30px 20px 30px;
    gap: 30px;
}
#filter {
    flex: 1;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
#display {
    flex: 9;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding: 0px 40px 20px 0px;
    background-color: whitesmoke;
    border-radius: 25px;
    box-shadow: inset 0 0 10px #000000;
    
}
#listing {
    display: flex;
    align-items: center;
    border-bottom: black solid;
    list-style-type: none;
}
#firstpart{
    flex: 2;
    font-family: 'FredokaOne';
    padding: 0px 30px;
}
.image-cropper {
  height: 90px;
  width: 90px;
  overflow: hidden;
  border-radius: 50%;
}
.profile-pic {
  object-fit: cover;
  height: 100%;
  width: 100%;
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
#secondpart{
    flex: 6;
}
#thirdpart{
    flex: 2;
    text-align: center;
}
.chat-button {
    border-radius: 8px;
    border: none;
    padding: 10px 20px;
    background-color:darkgrey;
    color: white;
    font-family: 'FredokaOne';
    cursor: pointer;
    transition-duration: 0.4s;
    font-size: 20px;
}
.chat-button:hover {
    background-color: black;
}
</style>