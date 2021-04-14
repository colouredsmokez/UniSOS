<template>
   <div>  
        <div id="uploadpage">
            <div id="main">
                
                <div id="header">
                    Create Listing
                    <select id="type" v-model="type">
                        <option value="Tutor" selected>Tutor</option>
                        <option value="Notes">Notes</option>
                    </select>
                </div>

                <div id="display">

                    <div id="upload">
                        <div v-show="type=='Tutor'" class="">
                        </div>
                        <div v-show="type=='Notes'" class="upload">
                            Upload Notes
                            <input type="file" id="upload-file" @change="previewImage" accept="image/*">
                            <div v-if="imageData!=null" class="image-cropper">
                                <img class="preview" :src="picture">
                            </div>
                        </div>
                    </div>

                    <div id="details">
                        <div id="firstpart">
                            <div id="module">
                                <input id="module-search" type="text" placeholder="Module" v-model="module">
                            </div>
                            <div id="grade">
                                Grade:
                                <select id="grade-select" v-model="grade">
                                    <option value="A+" selected>A+</option>
                                    <option value="A">A</option>
                                    <option value="A-" >A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="B-">B-</option>
                                    <option value="C+">C+</option>
                                    <option value="C">C</option>
                                    <option value="D+">D+</option>
                                    <option value="D">D</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                            <div id="took_in">
                                Took in:
                                <select id="took_in-select" v-model="took_in">
                                    <option value="AY20/21 S2" selected>AY20/21 S2</option>
                                    <option value="AY20/21 S1">AY20/21 S1</option>
                                    <option value="AY19/20 S2">AY19/20 S2</option>
                                    <option value="AY19/20 S1">AY19/20 S1</option>
                                    <option value="AY18/19 S2">AY18/19 S2</option>
                                    <option value="AY18/19 S1">AY18/19 S1</option>
                                    <option value="AY17/18 S2">AY17/18 S2</option>
                                    <option value="AY17/18 S1">AY17/18 S1</option>
                                    <option value="AY16/17 S2">AY16/17 S2</option>
                                    <option value="AY16/17 S1">AY16/17 S1</option> 
                                </select>
                            </div>
                        </div>
                        <div id="secondpart">
                            <textarea id="addInfo" placeholder="Additional Information" v-model="addInfo"></textarea>
                        </div>
                        <div id="thirdpart">
                            <div id="price">
                                <div v-show="type=='Notes'">
                                    Price(SGD) 
                                    <input id="price-input" type="number" v-model="price">
                                </div>
                            </div>
                            <div id="post">
                                <button id="post-btn" type="Submit" v-on:click="submit()">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from "../../firebase"
import { auth } from '../../firebase';
import { store } from '../../firebase';

export default {
    data() {
        return{
            user: auth.currentUser.uid,
            type:"Tutor",
            grade:"A+",
            module:"",
            took_in:"AY20/21 S2",
            addInfo:"",
            price:'',
            imageData: null,
            picture: null,
            uploadValue: 0
        }
    },
    methods:{
        submit:function() {
            if ( this.module=="" || this.took_in=="" || ((this.price=="" || this.picture==null) && this.type=="Notes") ) {
                alert("Incomplete Submission")
            } else {
                var newListing = {}
                newListing["typeOfList"] = this.type;
                newListing["grade"] = this.grade;
                newListing["module"] = this.module.toUpperCase();
                newListing["took_in"] = this.took_in
                newListing["addInfo"] = this.addInfo;
                newListing["userId"] = this.user;
                if (this.type=="Notes"){
                    newListing["price"] = this.price;
                    newListing["img"] = this.picture; //should be able to upload a few files
                }
            }
            db.collection("listing").add(newListing).then(docid => {
                db.collection("users").doc(this.user).get().then(
                    snapshot => {
                        var data = snapshot.data();
                        newListing["name"] = data.name;
                        if (this.type=="Notes") {
                            var selling = data.selling;
                            if (selling == null) {
                                selling = [];
                            }
                            selling.push(docid.id);
                            db.collection("users").doc(this.user).update({selling:selling}).then(() => {this.$router.go(this.$router.path)});
                        } else {
                            var teaching = data.teaching;
                            if (teaching == null) {
                                teaching = [];
                            }
                            teaching.push(docid.id);
                            db.collection("users").doc(this.user).update({teaching:teaching}).then(() => {this.$router.go(this.$router.path)});
                        }
                    }
                );
            });
        },
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            this.picture=null;
            const storageRef=store.ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture =url;
                });
            });
        }
    },
    created() {}
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
#uploadpage {
    background:  #47E4E4;
    height: 70vh;
    border: #47E4E4 solid thin;
    padding: 30px;
    font-family: "FredokaOne";
    font-size:20px;
}
#main {
    background: whitesmoke;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 25px;
    height: 100%;
}
#header {
    padding: 20px;
    text-align: center;
    font-size: 40px;
    border-bottom: black solid;
}
#type {
    padding: 5px 10px;
    font-size: 20px;
    vertical-align: middle;
    font-family: "FredokaOne";
}
#display {
    display: flex;
    height: 85%;
}
#upload{
    flex: 3;
    padding: 0px 20px 40px 40px;
    height: 85%;
}
#upload-file {
    padding: 20px 0px;
    font-family: 'FredokaOne';
    font-size: 15px;
    width: 200px;
}
#upload-file::-webkit-file-upload-button {
  font-family: 'FredokaOne';
  font-size: 15px;
  padding: 5px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.image-cropper {
    width: 100%;
    height: 350px;
    overflow: hidden;
}
.preview {
    object-fit: cover;
    height: 100%;
    width: 100%;
}
#details {
    height: 100%;
    flex: 7;
}
#firstpart {
    display: flex;
    height: 20%;
    padding:20px 40px 20px 20px;
    gap: 20px;
    align-items: center;
}
#module {
    flex: 5;
    text-align: center;
}
#module-search {
    text-transform: uppercase;
    width: 100%;
    box-sizing: border-box;
    border-radius: 25px;
    padding: 5px;
    font-size: 20px;
}
#grade {
    flex: 2;
    text-align: center;
}
#grade-select {
    padding: 5px;
    border-radius: 25px;
    font-size: 20px;
}
#took_in {
    flex: 3;
    text-align: center;
}
#took_in-select {
    padding: 5px;
    border-radius: 25px;
    font-size: 20px;
}
#secondpart {
    display: flex;
    height: 40%;
    padding: 0px 40px 0px 20px;
}
#addInfo {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 15px;
}
#thirdpart {
    display: flex;
    height: 20%;
    padding: 20px 40px 20px 20px;
    gap: 20px;
    align-items: center;
}
#price {
    flex: 3;
}
#price-input {
    border-radius: 25px;
    padding: 5px;
    box-sizing: border-box;
    width: 25%;
    font-size: 20px;

}
#post {
    flex: 1;
    text-align: right;
}
#post-btn {
    padding: 15px 20px;
    border-radius: 10px;
    background:  #47E4E4;
    border: none;
    font-size: 20px;
    font-family: "FredokaOne";
    color: white;
    box-shadow: 0 0 4px #000000;
    transition-duration: 0.4s;
    cursor: pointer;
}
#post-btn:hover {
    background: black;
}
</style>