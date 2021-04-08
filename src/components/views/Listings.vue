<template>
    <div>
        <div id= "listing-page">
            <br>
            <div id="filter">
                <h2> Filter</h2><br>
                <h3>Type</h3>
                <input type="radio" v-on:change="filter()" v-model="type" value="Notes">Notes
                <br>
                <input type="radio" v-on:change="filter()" v-model="type" value="Tutor">Tutor
                <br><br><br>
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
                    <li v-for="item in listingFiltered" v-bind:key="item.id" v-on:click="item.show = !item.show">
                        <section>
                            <div id="firstpart">
                                <h1 id="type">{{item.typeOfList}}</h1>
                                <!-- INSERT PFP 
                                <img class="img" :src="item.pfp"><br>-->
                                <img v-if="item.pfp" :src="item.pfp" class="img">
                                <img v-else src="../../assets/defaultpfp.jpg" class="img">
                                <br><button v-bind:id="item.userId" v-on:click="toProfile($event)">{{item.name}}</button>
                                <p>{{item.rating}}</p>
                            </div>
                            <div id="secondpart">
                                <h2 id= "module">{{item.module}}</h2>
                                <p id="took in">Took in: {{item.took_in}}</p>
                                <p id="grade">Final grade: {{item.grade}}</p>
                                <p id = "addInfo">{{item.addInfo}}</p>
                            </div>
                            <button v-bind:id="item.userId" v-on:click="toChat($event)">Chat</button>
                            <!-- <img v-bind:src="item.image" v-show="item.show"/> -->
                            <hr>
                        </section>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../../firebase'

export default {
    data() {
        return{
            type:'',
            rating:'',
            listing:[],
            listingFiltered:[],
            profilepics: {},
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
        /*fetchPFP: function() {
            db.collection('users').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var user = doc.data()
                    //alert(user.profilepic)
                    this.profilepics[doc.id] = user.profilepic
                })
            })
        }*/
    },
    created() {
        this.fetchItems();
        //this.fetchPFP();
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
    margin-top: 0%;
    overflow: auto;
}

.img {
  border-radius: 50em;
  height: 90px;
  width: 90px;
  vertical-align: middle;
  padding: 10px;
}

ul {
    list-style-type: none;
}

#filter {
    position:sticky;
    margin-left: 1.5%;
    width:15%;
    float:left;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

h2 {
    margin:0%
}

h3 {
    margin:0%
}

#display {
    margin-bottom: 30px;
    height: 90%;
    width:80%;
    float: left;
    background-color: whitesmoke;
    border-radius: 25px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
#display button {
    border-radius: 8px;
    border: none;
    padding: 5px;
    background-color:darkgrey;
    color: white;
    font-family: 'FredokaOne';
}

.chat {
  width: auto;
  height: 40%;
}
#firstpart{
    width:20%;
    float: left;
    font-family: 'FredokaOne';
}
#firstpart button {
    font-family: 'FredokaOne';
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    color: white;
    border: none;
    padding: 5px;
    background-color: #25abb4;
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