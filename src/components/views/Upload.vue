<template>
   <div>  
        <div id = "upload-page">
            <div id = "display">
                <h1>Create Listing
                
                <select id="type" v-model="type">
                    <option value="Tutor" selected>Tutor</option>
                    <option value="Notes">Notes</option>
                </select>
                </h1>
                <hr>
                <div id="upload">
                    <div v-show="type=='Tutor'" id='upload-tutor'></div>
                    <div v-show="type=='Notes'" id="upload-notes">
                        <label for="upload">Upload Notes</label><br>
                        <input type="file" id="upload" @change="previewImage" accept="image/*" >
                        <div v-if="imageData!=null">
                            <img class="preview" :src="picture">
                            <br>
                            
                            
                        </div>
                        
                    </div>
                </div>
                <div id="details">
                    <input id="module-name" type="text" placeholder="Module" v-model="module">
                    <label for="grade">Grade:</label>
                    <select id="grade" v-model="grade">
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
                    <label for="took-in">Took in: </label>
                    <select id="took-in" v-model="took_in">
                        <option value="AY20/21 S2" selected>AY20/21 S2</option>
                        <option value="AY20/21 S1">AY20/21 S1</option>
                        <option value="AY19/20 S2">AY19/20 S2</option>
                        <option value="AY19/20 S1">AY19/20 S1</option>
                        <option value="AY18/19 S2">AY18/19 S2</option>
                        <option value="AY18/19 S1">AY18/19 S1</option>
                        <option value="AY17/18 S2">AY17/18 S2</option>
                        <option value="AY17/18 S1">AY17/18 S1</option>
                        <option value="AY16/17 S2">AY20/21 S2</option>
                        <option value="AY16/17 S1">AY20/21 S1</option> 
                    </select>
                    <br>
                    <textarea name="addInfo" rows="10" cols ="80" placeholder="Additional Information" v-model="addInfo"></textarea>
                    <div v-show="type=='Notes'">
                        <label for="price">Price(SGD)</label>
                        <input type="number" id="price" v-model="price">
                    </div>
                    <input type="Submit" value="Post" v-on:click="submit()">
                </div>
                    
                
            </div>
        </div>
        
    </div>
    
  
</template>
<script>
import database from "../../firebase.js"
import { auth } from '../../firebase';
import firebase from 'firebase'

export default {
    data() {
        return{
            type:"Tutor",
            grade:"A+",
            module:"",
            took_in:"AY20/21 S2",
            addInfo:"",
            price:'',
            name:"",
            imageData: null,
            picture: null,
            uploadValue: 0
            
        }
    },
    methods:{
        submit:function() {
            if (this.module=="" || this.took_in=="" ||((this.price=="" ||this.picture==null)&& this.type=="Notes")) {
                alert("Incomplete Submission")
            } else {
                var newListing = {}
                newListing["typeOfList"] = this.type;
                newListing["grade"] = this.grade;
                newListing["module"] = this.module;
                newListing["took_in"] = this.took_in
                newListing["addInfo"] = this.addInfo;
                newListing["userId"] = auth.currentUser.uid;
                newListing["name"] = this.name;
                if (this.type=="Notes"){
                    newListing["price"] = this.price;
                    newListing["img"] = this.picture
                }
            }
            database.collection("listing").add(newListing).then(()=>location.reload());
        },
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            this.picture=null;
            const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture =url;
            });
        }
        );
        },

        
    },
    created() {
    database.collection('users').doc(auth.currentUser.uid).get().then(
        snapshot => {
            var data = snapshot.data();
            this.name = data.name;
        },
        err => {
            alert(err.message)
        }
    )
  }
}
    
    



</script>


<style scoped>
#upload-page {
    background:  #47E4E4;
    margin-top: 0%;
    overflow: auto;
}

#details {
    float:left;
    width: 50%;
}

#upload{
    width:50%;
    float: left;
    
}

#display {
    
    margin:50px;
    background-color: whitesmoke;
    border-radius: 25px;
    overflow: auto;
}
h1 {
    text-align: center;
}

#module-name{
    text-transform: uppercase;
}
img.preview {
    width: 700px;
    margin:10px;
    border: 2px solid black;    
}

#upload-tutor {
    border:1px solid gray;
    width:800px;
    height:500px;
    position:relative;
    align-self:center;
    margin:7%;
}

#upload-tutor:after{
    content:"";
    position:absolute;
    border-top:1px solid black;
    width:943px;
    transform: rotate(32deg);
    transform-origin: 0% 0%;
}

#upload-notes{
    margin-left:7%;
}
</style>