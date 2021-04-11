<template>
    <div class="edit">
        <div class="pfp">
            <p> Edit Profile Picture </p>
            <div class="image-cropper">
                <img class="profile-pic" :src="profilepic" alt="profile pic">
            </div>
            <div>
                <input id="btn" type="file" v-on:change="previewImage" accept="image/*">
                <button id="btn" v-on:click="upload">Upload</button>
            </div>
        </div>
        <div class="text-edit">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" v-model="name"><br>
            <button v-on:click = "updateName()"> Update Name </button>
            <br><br>
            <label for="bio">Bio:</label><br>
            <textarea id="bio" name="bio" v-model="bio" rows=5 cols=50></textarea> <br>
            <button v-on:click = "updateBio()"> Update Bio </button>
        </div>
    </div>
</template>

<script>
// import * as data from 'https://api.nusmods.com/v2/2020-2021/moduleList.json'
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { store } from '../../firebase';

export default {
    data() {
        return {
            datapacket: {},
            editable: ['name','bio'],
            uid: auth.currentUser.uid,
            name: '',
            email: '',
            university: '',
            profilepic: "https://firebasestorage.googleapis.com/v0/b/unisos-bcf1f.appspot.com/o/defaultpfp.jpg?alt=media&token=5fd8c012-3d56-4771-be88-fa4ae98d3d32",
            imageData: null,
            bio: '',
            reviews: [],
            classes: [],
            notes: []
            // modules: data
        }
    },
    methods: {
        fetchInfo: function() {
            db.collection('users').doc(this.uid).get().then(
                snapshot => {
                    var data = snapshot.data();
                    this.name = data.name;
                    this.email = data.email;
                    this.university = data.university;
                    this.profilepic = data.profilepic;
                    this.bio = data.bio;
                    this.reviews = data.reviews;
                    this.classes = data.tutoring;
                    this.notes = data.selling;
                },
                err => {
                    alert(err.message)
                }
            );
        },
        updateName: function() {
            db.collection('users').doc(this.uid).update({name:this.name}).then(
                () => {
                    alert(`Name has been updated!`);
                    this.$router.go(this.$router.path);
                })
        },
        updateBio: function() {
            db.collection('users').doc(this.uid).update({bio:this.bio}).then(
                () => {
                    alert(`Bio has been updated.`);
                    this.$router.go(this.$router.path)
                    })
        },
        upload: function(e) {
            var storageRef = store.ref(`${this.email}/${this.imageData.name}`).put(this.imageData);
            storageRef.on(
                `state_changed`,
                snapshot => {
                    console.log(snapshot);
                    //this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                },
                error => {
                    console.log(error.message);
                },
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then(
                        (url) => {
                            this.profilepic = url;
                            db.collection('users').doc(this.uid).update({profilepic:url}).then(
                                () => {
                                    alert(`Profile picture changed.`);
                                    this.$router.go( this.$router.path );
                                }
                            );
                        }
                    );
                }
            );
            e.preventDefault();
        },
        previewImage: function(event) {
            this.imageData = event.target.files[0];
        }
    },
    created() {
        this.fetchInfo();
    }
}
</script>

<style scoped>
    .pfp {
        text-align: center;
        padding: 30px;
        float: left;
        width: 25%;
    } 
    .edit {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 22px;
    }
    .image-cropper {
        width: 200px;
        height: 200px;
        overflow: hidden;
        border-radius: 50%;
        margin: auto;
        
    }
    .profile-pic {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
    .text-edit {
        width: 75%;
        padding: 30px
    }
</style>