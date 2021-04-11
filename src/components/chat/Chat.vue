<template>
    <div class="background">
        <div class="flex-container">
            <div class="flex-child-inbox">
                <div v-for="user in users" v-bind:key="user">
                    <button class="inbox" v-bind:id="user[0]" v-on:click="fetchMessages($event)">
                        {{user[1].name}}
                    </button>
                </div>
            </div>  
            <div class="flex-child-chat">
                <div class="chat-msg">
                    <br>
                    <div v-for="message in messages" v-bind:key="message.id">
                        <div v-if="message.author == thisData.name" class="msg" style="float:right">
                            <span class="msg-user"> You </span>
                            <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                            <div class="msg-bubble">{{message.message}}</div>
                        </div>
                        <div v-if="message.author == otherData.name" class="msg" style="float:left">
                            <span class="msg-user"> {{message.author}} </span>
                            <span class="msg-time"> {{'   ' + timeSent(message.createdAt.toDate())}} </span>
                            <div class="msg-bubble">{{message.message}}</div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <br>
                </div>
                <div class="chat-input">
                    <div class="input-upload">
                        <button class="input-upload-btn"></button>
                    </div>
                    <div class="input-text">
                        <textarea class="input-text-field" @keyup.enter="saveMessage()" v-model="message" type="text" placeholder="Type a message"/>
                    </div>
                    <div class="input-enter">
                        <button class="input-enter-btn" v-on:click="saveMessage()"> <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../../firebase";
import { auth } from '../../firebase';

export default {
    data() {
        return {
            message: null,
            messages: [],
            users: [],
            thisUser: auth.currentUser.uid,
            thisData: [],
            otherUser: '',
            otherData: []
        }
    },
    methods: {
        saveMessage() {
            let data = {
                message: this.message,
                author: this.thisData.name,
                createdAt: new Date()
            }
            console.log(data);
            db.collection('chat').doc(this.thisUser).collection(this.otherUser).add(data).then(() => {
                db.collection('chat').doc(this.otherUser).collection(this.thisUser).add(data).then(() => {
                    this.message = null;
                });
            });
        },
        fetchUsers:function() {
            db.collection('users').get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    if (doc.id == this.thisUser) {
                        this.thisData = doc.data();
                    } else if (db.collection('chat').doc(this.thisUser).collection(doc.id)) { //still got problem
                        this.users.push([doc.id,doc.data()]);
                    }
                },
                err => {
                    alert(err.message)
                });
            },
            err => {
                alert(err.message)
            });
        },
        fetchMessages(event) {
            this.otherUser = event.target.getAttribute("id");
            db.collection('users').doc(this.otherUser).get().then(snapshot => {
                this.otherData = snapshot.data();
                db.collection('chat').doc(this.thisUser).collection(this.otherUser).orderBy('createdAt').onSnapshot((querySnapshot) => {
                    let allMessages = [];
                    querySnapshot.forEach(doc => {
                        allMessages.push(doc.data())
                    });
                    this.messages = allMessages;
                });
            });
        },
        timeSent(d) {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            var date = d.getDate();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var mth = d.getMonth();
            var h = addZero(d.getHours());
            var m = addZero(d.getMinutes());
            return String(date) + " " + months[mth] + ", " + String(h) + ":" + String(m);
        }
    },
    created() {
        this.fetchUsers();
        this.fetchMessages();
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
    .background {
        background: #47E4E4;
        font-family: sans-serif;
        height: 78vh;
    }
    .flex-container {
        display: flex;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        height: 100%;
    }
    .flex-child-inbox {
        margin: 30px 0px 30px 30px;
        border-radius: 25px 0px 0px 25px;
        background: whitesmoke;
        flex: 2;
        text-align: center;
        height: 90%;
        overflow-y: auto;
    }
    .inbox {
        width:100%;
        height: 100px;
        border: none;
        background: whitesmoke;
        font-family: "FredokaOne";
    }
    .inbox:hover, .inbox:active {
        color: white;
        background: black;
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
    .flex-child-chat {
        margin: 30px 30px 30px 0px;
        background: whitesmoke;
        flex: 3;
        height: 90%;
    }
    .chat-msg {
        background-image: url("../../assets/ChatBG.png");
        background-size: cover;
        height: 85%;
        overflow-y: auto;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }
    .msg {
        margin: 10px 30px;
    }
    .msg-user {
        color:#05728f;
        font-size: 13px;
        font-weight: bold;
    }
    .msg-time {
        color: #747474;
        font-size: 10px;
    }
    .msg-bubble {
        background: lightgray;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
        border-radius: 5px;
        word-wrap: break-word;
        font-size: 16px;
        max-width: 400px;
        padding: 10px;
    }
    .chat-input {
        background: #5ABAC0;
        height:15%;
        display: flex;
    }
    .input-upload {
        margin: 15px;
        flex: 1;
    }
    .input-upload-btn {
        height:100%;
        width:100%;
        cursor: pointer;
        background: none;
        border: none;
    }
    .input-text {
        margin: 15px 0px 15px 0px;
        flex: 18;
    }
    .input-text-field {
        height:100%;
        width:100%;
        font-size: 15px;
        border-radius: 20px;
        border: none;
        padding: 10px 20px;
        box-sizing: border-box;
        font-family: sans-serif;
        background: whitesmoke;
    }
    .input-enter {
        margin: 15px;
        flex: 1;
    }
    .input-enter-btn {
        height:100%;
        width:100%;
        cursor: pointer;
        background: none;
        border: none;
        font-size: 25px;
        text-align: left;
        color: white;
    }
    .input-enter-btn:hover {
        color: black;
    }
</style>