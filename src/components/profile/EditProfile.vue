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
            <textarea id="bio" name="bio" v-model="bio" rows=5 cols=50 placeholder="Enter a bio"></textarea> 
            <br>
            <button v-on:click = "updateBio()"> Update Bio </button>
            <br><br>
            <label for="mods"> What modules are you taking? </label><br>
            <a id='desc'> Update your modules based on what you're taking this semester so that we can best tailor our recommendations for you! </a> 
            <br>
            <input type="text" id="mods" name="mods" placeholder="Enter a module code (e.g. BT3103)" width="pixels">
            <br>
            <button v-on:click = "addMod()"> Add Module </button>
            <a id='modules'> or </a>
            <button v-on:click = "deleteMod()"> Remove Module </button>
            <br><br>
            <ul>
                <p> Your current module list:
                <li class="bullets" v-for="mod in modules" v-bind:key="mod" id='modules'> {{mod}} </li>
            </ul>
        </div>
    </div>
</template>

<script>
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
            modules: [],
            notes: []
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
                    this.modules = data.modules;
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
                    alert(`Name has been updated.`);
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
        addMod: function() {
            var mod = document.getElementById("mods").value.toUpperCase();
            db.collection('users').doc(this.uid).get().then(snapshot => {
                var modules = snapshot.data().modules;
                if (modules == null) {
                    modules = []
                }
                if(mod == '') {
                    alert('Please enter a valid field.')
                } else if(modules.includes(mod)) {
                    alert('You have previoudly listed this module!')
                } else {
                    var result = confirm('Please confirm if "' + mod.toUpperCase() + '" is the module you want to add to your profile.');
                    if (result) {
                        modules.push(mod.toUpperCase());
                        db.collection('users').doc(this.uid).update({modules: modules}).then(
                            () => {
                                alert('"' + mod.toUpperCase() + `" has been added to your profile.`);
                                this.$router.go( this.$router.path );
                            });
                    }
                }
            })
        },
        deleteMod: function() {
            var mod = document.getElementById("mods").value.toUpperCase();
            db.collection('users').doc(this.uid).get().then(snapshot => {
                var modules = snapshot.data().modules;
                if (mod == '') {
                    alert('Please enter a valid field.')
                } else if (modules.includes(mod)) {
                    modules = modules.filter(item => item !== mod);
                    var result = confirm('Please confirm if "' + mod.toUpperCase() + '" is the module you want to delete from your profile.');
                    if (result) {
                        db.collection('users').doc(this.uid).update({modules: modules}).then(
                                () => {
                                    alert('"' + mod.toUpperCase() + `" has been removed from your profile.`);
                                    this.$router.go( this.$router.path );
                                });
                    }
                } else {
                    alert('Module has not been previously registered. Please enter an existing module code listed in your profile page.')
                }
            })
        },
        upload: function(e) {
            var storageRef = store.ref(`${this.email}/${this.imageData.name}`).put(this.imageData);
            storageRef.on(
                `state_changed`,
                snapshot => {
                    console.log(snapshot);
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
        }, 
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
        height: 80vh;
    } 
    .edit {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 22px;
        background-image: url('../../assets/ChatBG.png');
        height: 80vh;
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
        padding: 30px;
        height: 80vh;
    }
    #name{
        width: 250px;
    }
    #mods {
        width: 250px;
    }
    #modules {
        font-size:14px;
        color: rgba(85, 83, 83, 0.836);
    }
    #desc {
        font-size:12px;
        font-style: italic;
        color: rgba(85, 83, 83, 0.836);
    }
    .bullets {
        padding-left: 1em;
        margin-right: 2em;
        margin-left: 0;
        list-style: none;
    }
</style>